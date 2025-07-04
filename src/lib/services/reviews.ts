import axiosInstance from "@/lib/axios";
import { ReviewWithProduct } from "@/types/review";
import { createServerApi } from "../api";
class ReviewService {
  async getMyReviews(): Promise<ReviewWithProduct[]> {
    const api = await createServerApi(); 
    const { data } = await api.get("/users/me/reviews");
    return data.data;
  }
}
export const reviewService = new ReviewService();