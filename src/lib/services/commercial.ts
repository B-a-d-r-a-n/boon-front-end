import { Commercial } from "@/types/commercial";
import { createServerApi } from "../api";
class CommercialService {
  async getCommercials(): Promise<Commercial[]> {
    const api = await createServerApi();
    const { data } = await api.get("/commercials");
    return data.data;
  }
}
export const commercialService = new CommercialService();