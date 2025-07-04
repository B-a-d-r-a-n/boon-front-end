import axiosInstance from "@/lib/axios";
import { PopulatedUser, User } from "@/types/auth";
import { createServerApi } from "../api";
class UserService {
  async getMyProfileOnServer(): Promise<PopulatedUser | null> {
    try {
      const api = await createServerApi();
      const { data } = await api.get("/auth/me");
      return data.data.user;
    } catch (error) {
      console.error("Error fetching user profile on server:", error);
      return null;
    }
  }
  async getMyProfile(token: string): Promise<PopulatedUser> {
    const { data } = await axiosInstance.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data.user;
  }
  addItemToCart(
    { productId, quantity }: { productId: string; quantity: number },
    token: string
  ) {
    return axiosInstance.post(
      "/users/cart",
      { productId, quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  updateCartItemQuantity(
    { productId, quantity }: { productId: string; quantity: number },
    token: string
  ) {
    return axiosInstance.patch(
      `/users/cart/${productId}`,
      { quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  removeItemFromCart(productId: string, token: string) {
    return axiosInstance.delete(`/users/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  updateMyProfile(profileData: Partial<User>, token: string) {
    return axiosInstance.patch("/users/me", profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  toggleWishlistItem(productId: string, token: string) {
    return axiosInstance.post(
      "/users/wishlist",
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
export const userService = new UserService();