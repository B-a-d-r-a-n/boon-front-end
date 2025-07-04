"use client";
import { useQuery } from "@tanstack/react-query";
import { deliveryService } from "../services/delivery";
export const useGetDeliveryMethods = () => {
  return useQuery({
    queryKey: ["delivery-methods"],
    queryFn: deliveryService.getDeliveryMethods,
    staleTime: Infinity, 
  });
};