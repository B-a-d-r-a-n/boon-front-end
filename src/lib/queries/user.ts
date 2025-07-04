"use client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { userService } from "../services/user";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { PopulatedUser, User } from "@/types/auth";
import { userKeys } from "./keys";
export const useUser = () => {
  const { data: session, status } = useSession();
  const isEnabled = status === "authenticated" && !!session?.accessToken;
  return useQuery({
    queryKey: userKeys.profile(session?.user?.email!),
    queryFn: async () => {
      if (!session?.accessToken) {
        return null;
      }
      return userService.getMyProfile(session.accessToken);
    },
    enabled: isEnabled,
    staleTime: 1000 * 60 * 5, 
    placeholderData: keepPreviousData,
  });
};
export const useToggleWishlist = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (productId: string) => {
      if (!session?.accessToken) throw new Error("Not authenticated.");
      return userService.toggleWishlistItem(productId, session.accessToken);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.profile(session?.user?.email!),
      });
    },
    onSuccess: () => {
      toast.success("Wishlist updated!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Could not update wishlist."
      );
    },
  });
};
const useAuthenticatedMutation = <TVariables, TContext>(
  mutationFn: (variables: TVariables, token: string) => Promise<any>,
  options?: any 
) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (variables: TVariables) => {
      if (!session?.accessToken) {
        toast.error("You must be logged in to perform this action.");
        return Promise.reject(new Error("Not authenticated"));
      }
      return mutationFn(variables, session.accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.profile(session?.user?.email!),
      });
      options?.onSuccess?.();
    },
    onError: (error: any) => {
      if (error.message !== "Not authenticated") {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
      options?.onError?.(error);
    },
    ...options,
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
  const queryKey = userKeys.profile(session?.user?.email!);
  return useMutation({
    mutationFn: (productId: string) => {
      if (!session?.accessToken) throw new Error("Not authenticated.");
      return userService.removeItemFromCart(productId, session.accessToken);
    },
    onMutate: async (productIdToRemove) => {
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
      if (context?.previousUserData) {
        queryClient.setQueryData(queryKey, context.previousUserData);
      }
      toast.error("Could not remove item. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onSuccess: () => {
      toast.success("Item removed from cart.");
    },
  });
};
export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const queryKey = userKeys.profile(session?.user?.email!);
  return useAuthenticatedMutation(userService.updateCartItemQuantity, {
    onMutate: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousUserData =
        queryClient.getQueryData<PopulatedUser>(queryKey);
      if (previousUserData) {
        const updatedCart = previousUserData.cart
          .map((item) =>
            item.product?._id === productId ? { ...item, quantity } : item
          )
          .filter((item) => item.quantity > 0);
        queryClient.setQueryData(queryKey, {
          ...previousUserData,
          cart: updatedCart,
        });
      }
      return { previousUserData };
    },
    onError: (err: any, variables: any, context: any) => {
      if (context?.previousUserData) {
        queryClient.setQueryData(queryKey, context.previousUserData);
      }
      toast.error("Failed to update cart quantity.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const queryKey = userKeys.profile(session?.user?.email!);
  return useAuthenticatedMutation(userService.updateMyProfile, {
    onSuccess: (updatedUser: User) => {
      toast.success("Profile updated!");
      queryClient.setQueryData(queryKey, updatedUser); 
    },
  });
};