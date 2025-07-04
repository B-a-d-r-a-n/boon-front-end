import { categoryService } from "./../services/categories";
("use client");
import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "./keys";
export const useGetCategories = () => {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: categoryService.fetchCategories,
    staleTime: 1000 * 60 * 60,
  });
};