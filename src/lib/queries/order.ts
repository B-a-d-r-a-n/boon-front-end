"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { orderService } from "../services/order";
import { orderKeys, userKeys } from "./keys";
import { useSession } from "next-auth/react";
import { CreateOrderPayload } from "@/types/order";
import { AxiosError } from "axios";

export const useGetOrderById = (orderId: string) => {
  const { data: session, status } = useSession();
  const isEnabled = status === "authenticated" && !!orderId;
  return useQuery({
    queryKey: orderKeys.details(orderId),
    queryFn: async () => {
      if (!session?.accessToken) return null;
      return orderService.getOrderById(orderId, session.accessToken);
    },
    enabled: isEnabled,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => {
      if (!session?.accessToken) {
        toast.error("You must be logged in to place an order.");
        return Promise.reject(new Error("Not authenticated"));
      }
      return orderService.createOrder(payload, session.accessToken);
    },
    onSuccess: () => {
      toast.success("Order placed successfully!");
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if ((error as Error).message !== "Not authenticated") {
        toast.error(error.response?.data?.message || "Failed to place order.");
      }
    },
  });
};
