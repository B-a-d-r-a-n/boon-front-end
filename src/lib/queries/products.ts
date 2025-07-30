"use client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { productService } from "../services/products";
import { toast } from "sonner";
import { productKeys } from "./keys";
import { useSession } from "next-auth/react";
import { Product, Review, ProductsResponseDTO } from "@/types/product";

type QueryFilter = Record<
  string,
  string | number | boolean | string[] | undefined
>;

export const useGetProducts = (filters: QueryFilter) => {
  return useQuery<ProductsResponseDTO>({
    queryKey: productKeys.lists(filters),
    queryFn: () => productService.fetchProducts(filters),
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000,
  });
};

export const useGetProductBySlug = (slug: string, initialData?: Product) => {
  return useQuery<Product | null>({
    queryKey: productKeys.details(slug),
    queryFn: () => productService.fetchProductBySlug(slug),
    initialData: initialData,
    enabled: !!slug,
  });
};

export const useCreateReview = (productSlug: string) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (data: {
      productId: string;
      reviewData: { rating: number; comment: string };
    }) => {
      if (!session?.accessToken) throw new Error("Not authenticated.");
      return productService.createReview(
        data.productId,
        data.reviewData,
        session.accessToken
      );
    },
    onMutate: async ({ reviewData }) => {
      const queryKey = productKeys.details(productSlug);
      await queryClient.cancelQueries({ queryKey });

      const previousProductData = queryClient.getQueryData<Product>(queryKey);

      if (previousProductData && session?.user) {
        const newReview: Review = {
          _id: `optimistic-${Date.now()}`,
          name: session.user.name ?? "User",
          comment: reviewData.comment,
          rating: reviewData.rating,
          user: {
            _id: session.user.id,
            name: session.user.name ?? "User",
            avatarUrl: session.user.image ?? "",
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const updatedProductData: Product = {
          ...previousProductData,
          reviews: [newReview, ...previousProductData.reviews],
          numReviews: previousProductData.numReviews + 1,
        };
        queryClient.setQueryData(queryKey, updatedProductData);
      }
      return { previousProductData };
    },
    onError: (err, variables, context) => {
      if (context?.previousProductData) {
        queryClient.setQueryData(
          productKeys.details(productSlug),
          context.previousProductData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.details(productSlug),
      });
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
    },
  });
};
