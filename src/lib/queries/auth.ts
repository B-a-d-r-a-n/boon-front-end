"use client";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginInput, RegisterInput } from "../validation/auth"; 
import { authService } from "../services/auth";
export const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: async (data, variables) => {
      toast.success("Account created successfully! Logging you in...");
      const signInResponse = await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        redirect: false,
      });
      if (signInResponse?.ok) {
        router.push("/");
        router.refresh();
      } else {
        toast.error("Login failed after registration. Please log in manually.");
        router.push("/login");
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "An unknown error occurred."
      );
    },
  });
};
export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (result?.error) {
        throw new Error("Invalid email or password.");
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Logged in successfully!");
      router.push("/");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};