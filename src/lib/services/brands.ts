import axiosInstance from "@/lib/axios";
import { Brand, BrandResponseDTO } from "@/types/brand";
class BrandService {
  fetchBrands = async (): Promise<Brand[]> => {
    const { data } = await axiosInstance.get<BrandResponseDTO>("/brands");
    return data.data;
  };
}
export const brandService = new BrandService();