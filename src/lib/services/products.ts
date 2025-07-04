import axiosInstance from "@/lib/axios"; 
import { ProductsResponseDTO, Product } from "@/types/product";
import { createServerApi } from "../api";
class ProductService {
  async fetchProducts(params: Record<string, any>) {
    const api = await createServerApi();
    const { data } = await api.get<ProductsResponseDTO>("/products", {
      params,
    });
    return data;
  }
  async fetchProductBySlug(slug: string) {
    const api = await createServerApi();
    try {
      const { data } = await api.get<Product>(`/products/${slug}`);
      return data;
    } catch (error) {
      return null;
    }
  }
  createReview(
    productId: string,
    reviewData: { rating: number; comment: string },
    token: string 
  ) {
    return axiosInstance.post(`/products/${productId}/reviews`, reviewData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
export const productService = new ProductService();