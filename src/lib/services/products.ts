import axiosInstance from "@/lib/axios";
import { ProductsResponseDTO, Product } from "@/types/product";
import { createServerApi } from "../api";

type QueryParams = Record<
  string,
  string | number | boolean | string[] | undefined
>;

class ProductService {
  async fetchProducts(params: QueryParams) {
    const api = await createServerApi();
    const { data } = await api.get<ProductsResponseDTO>("/products", {
      params,
    });
    return data;
  }

  async fetchProductBySlug(slug: string): Promise<Product | null> {
    const api = await createServerApi();
    try {
      const { data } = await api.get<Product>(`/products/${slug}`);
      return data;
    } catch (error) {
      console.log(error);

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
