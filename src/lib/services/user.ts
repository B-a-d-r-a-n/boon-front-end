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

  async addItemToCart(
    { productId, quantity }: { productId: string; quantity: number },
    token: string
  ): Promise<void> {
    await axiosInstance.post(
      "/users/cart",
      { productId, quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  async updateCartItemQuantity(
    { productId, quantity }: { productId: string; quantity: number },
    token: string
  ): Promise<void> {
    await axiosInstance.patch(
      `/users/cart/${productId}`,
      { quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  async removeItemFromCart(productId: string, token: string): Promise<void> {
    await axiosInstance.delete(`/users/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateMyProfile(
    profileData: Partial<User>,
    token: string
  ): Promise<User> {
    const { data } = await axiosInstance.patch("/users/me", profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async toggleWishlistItem(productId: string, token: string): Promise<void> {
    await axiosInstance.post(
      "/users/wishlist",
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}

export const userService = new UserService();
