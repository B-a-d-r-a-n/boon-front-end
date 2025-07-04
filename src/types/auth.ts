import { CartItem } from "./cart";
import { Product } from "./product";
export interface AuthResponseDTO {
  status: string;
  accessToken: string;
  data: Data;
}
export interface Data {
  user: User;
}
export interface Address {
  fullName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
}
export interface User {
  name?: string;
  email: string;
  role: string;
  avatarUrl?: string;
  orderHistory: string[];
  shippingAddress?: Address;
  wishlist: string[];
  _id: string;
  cart: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface PopulatedUser extends Omit<User, "wishlist" | "cart"> {
  wishlist: Product[];
  cart: {
    product: Product;
    quantity: number;
    _id?: string;
  }[];
}
