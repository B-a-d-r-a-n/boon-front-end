import axiosInstance from "@/lib/axios";
import { DeliveryMethod } from "@/types/order"; 
class DeliveryService {
  async getDeliveryMethods(): Promise<DeliveryMethod[]> {
    const { data } = await axiosInstance.get("/delivery-methods");
    return data.data; 
  }
}
export const deliveryService = new DeliveryService();