"use client";
import { brandService } from "./../services/brands";
import { useQuery } from "@tanstack/react-query";
import { brandKeys } from "./keys";
export const useGetBrands = () => {
  return useQuery({
    queryKey: brandKeys.all,
    queryFn: brandService.fetchBrands,
    staleTime: 1000 * 60 * 60,
  });
};