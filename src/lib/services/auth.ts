import axiosInstance from "@/lib/axios";
import { AuthResponseDTO } from "@/types/auth";
import { RegisterInput } from "../validation/auth";
class AuthService {
  async register(data: RegisterInput): Promise<AuthResponseDTO> {
    const { data: responseData } = await axiosInstance.post<AuthResponseDTO>(
      "/auth/register",
      {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      }
    );
    return responseData;
  }
}
export const authService = new AuthService();