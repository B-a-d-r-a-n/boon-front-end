import { Address } from "./auth";

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}
export interface OrdersResponseDTO {
  status: string;
  results: number;
  data: Order[];
}
export interface DeliveryMethod {
  _id: string;
  shortName: string;
  description: string;
  deliveryTime: string;
  price: number;
}
export interface OrderItem {
  _id?: string;
  product: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
}
export interface CreateOrderPayload {
  orderItems: { product: string; quantity: number }[];
  shippingAddress: Address;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}
