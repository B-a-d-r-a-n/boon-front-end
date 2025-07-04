import axios from "axios";
import { auth } from "./auth";
export const createServerApi = async () => {
  const session = await auth();
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
  });
  if (session?.accessToken) {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${session.accessToken}`;
  }
  return api;
};