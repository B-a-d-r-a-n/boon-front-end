"use client";
import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { productService } from "../services/products";
import { toast } from "sonner";
import { productKeys } from "./keys";
import { useSession } from "next-auth/react";
import { Product, Review } from "@/types/product";
export const useGetProducts = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: productKeys.lists(filters), 
    queryFn: () => productService.fetchProducts(filters), 
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000, 
  });
};
export const useGetProductBySlug = (slug: string, initialData?: any) => {
  return useQuery({
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
          name: session.user.name!,
          _id: `optimistic-${Date.now()}`, 
          comment: reviewData.comment,
          rating: reviewData.rating,
          user: {
            _id: session.user.id,
            name: session.user.name!,
            avatarUrl: session.user.image!,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const updatedProductData = {
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