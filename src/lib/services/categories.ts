import axiosInstance from "@/lib/axios";
import { Category, CategoryResponseDTO } from "@/types/category";
class CategoryService {
  fetchCategories = async (): Promise<Category[]> => {
    const { data } = await axiosInstance.get<CategoryResponseDTO>(
      "/categories"
    );
    return data.data;
  };
}
export const categoryService = new CategoryService();