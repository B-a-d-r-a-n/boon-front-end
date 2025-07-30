"use client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
  UseMutationOptions,
} from "@tanstack/react-query";
import { userService } from "../services/user";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { PopulatedUser, User } from "@/types/auth";
import { userKeys } from "./keys";
import { AxiosError } from "axios";
import { Product } from "@/types/product";

interface MutationContext {
  previousUserData?: PopulatedUser;
}

type PopulatedCartItem = { product: Product; quantity: number; _id?: string };

export const useUser = () => {
  const { data: session, status } = useSession();
  const queryKey = userKeys.profile(session?.user?.email ?? "");
  const isEnabled = status === "authenticated" && !!session?.user?.email;

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!session?.accessToken) return null;
      return userService.getMyProfile(session.accessToken);
    },
    enabled: isEnabled,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};

const useAuthenticatedMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: (variables: TVariables, token: string) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation<TData, TError, TVariables, TContext>({
    ...options,
    mutationFn: (variables: TVariables) => {
      if (!session?.accessToken) {
        toast.error("You must be logged in to perform this action.");
        return Promise.reject(new Error("Not authenticated"));
      }
      return mutationFn(variables, session.accessToken);
    },
    onSuccess: (data, variables, context) => {
      if (session?.user?.email) {
        queryClient.invalidateQueries({
          queryKey: userKeys.profile(session.user.email),
        });
      }
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      if ((error as Error).message !== "Not authenticated") {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(axiosError.response?.data?.message || "An error occurred.");
      }
      options?.onError?.(error, variables, context);
    },
  });
};

export const useAddToCart = () => {
  return useAuthenticatedMutation(userService.addItemToCart, {
    onSuccess: () => {
      toast.success("Item added to cart!");
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation<void, Error, string, MutationContext>({
    mutationFn: (productId: string) => {
      if (!session?.accessToken) throw new Error("Not authenticated.");
      return userService.removeItemFromCart(productId, session.accessToken);
    },
    onMutate: async (productIdToRemove) => {
      const queryKey = userKeys.profile(session?.user?.email ?? "");
      if (!session?.user?.email) return;

      await queryClient.cancelQueries({ queryKey });
      const previousUserData =
        queryClient.getQueryData<PopulatedUser>(queryKey);

      if (previousUserData) {
        const updatedCart = previousUserData.cart.filter(
          (item) => item.product?._id !== productIdToRemove
        );
        const updatedUserData = { ...previousUserData, cart: updatedCart };
        queryClient.setQueryData(queryKey, updatedUserData);
      }
      return { previousUserData };
    },
    onError: (err, variables, context) => {
      const queryKey = userKeys.profile(session?.user?.email ?? "");
      if (context?.previousUserData) {
        queryClient.setQueryData(queryKey, context.previousUserData);
      }
      toast.error("Could not remove item. Please try again.");
    },
    onSettled: () => {
      if (session?.user?.email) {
        queryClient.invalidateQueries({
          queryKey: userKeys.profile(session.user.email),
        });
      }
    },
    onSuccess: () => {
      toast.success("Item removed from cart.");
    },
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useAuthenticatedMutation(userService.updateCartItemQuantity, {
    onMutate: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const queryKey = userKeys.profile(session?.user?.email ?? "");
      if (!session?.user?.email) return;

      await queryClient.cancelQueries({ queryKey });

      const previousUserData =
        queryClient.getQueryData<PopulatedUser>(queryKey);

      if (previousUserData) {
        const updatedCart = previousUserData.cart
          .map((item: PopulatedCartItem) =>
            item.product?._id === productId ? { ...item, quantity } : item
          )
          .filter((item: PopulatedCartItem) => item.quantity > 0);

        queryClient.setQueryData(queryKey, {
          ...previousUserData,
          cart: updatedCart,
        });
      }
      return { previousUserData };
    },
    onError: (error, variables, context) => {
      const queryKey = userKeys.profile(session?.user?.email ?? "");
      if ((context as MutationContext)?.previousUserData) {
        queryClient.setQueryData(
          queryKey,
          (context as MutationContext).previousUserData
        );
      }
      toast.error("Failed to update cart quantity.");
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useAuthenticatedMutation(userService.updateMyProfile, {
    onSuccess: (updatedUser: User) => {
      const queryKey = userKeys.profile(session?.user?.email ?? "");
      if (!session?.user?.email) return;

      toast.success("Profile updated!");
      queryClient.setQueryData(queryKey, updatedUser);
    },
  });
};
