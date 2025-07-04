import { User } from "./auth";
export interface GetUserResponseDTO {
  status: string;
  data: Data;
}
export interface Data {
  user: User;
}