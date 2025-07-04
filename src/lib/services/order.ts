import axiosInstance from "@/lib/axios";
import { Order, CreateOrderPayload, OrdersResponseDTO } from "@/types/order";
import { createServerApi } from "../api";
class OrderService {
  async getMyOrdersOnServer(): Promise<Order[]> {
    const api = await createServerApi();
    const { data } = await api.get<OrdersResponseDTO>("/orders/myorders");
    return data.data;
  }
  async getOrderByIdOnServer(orderId: string): Promise<Order | null> {
    try {
      const api = await createServerApi();
      const { data } = await api.get<Order>(`/orders/${orderId}`);
      return data;
    } catch (error) {
      console.error("Failed to fetch order on server:", error);
      return null;
    }
  }
  async getOrderById(orderId: string, token: string): Promise<Order> {
    const { data } = await axiosInstance.get(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
  async createOrder(
    payload: CreateOrderPayload,
    token: string
  ): Promise<Order> {
    const { data } = await axiosInstance.post("/orders", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}
export const orderService = new OrderService();