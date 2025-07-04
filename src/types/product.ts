import { User } from "./auth";
export interface ProductsResponseDTO {
  pagination: Pagination;
  data: Product[];
  priceRange: {
    min: number;
    max: number;
  };
}
export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: Pick<User, "_id" | "name" | "avatarUrl">;
  createdAt: string;
  updatedAt: string;
  _id: string;
}
export interface Brand {
  _id: string;
  name: string;
}
export interface Product {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  category: string;
  brand: Brand;
  description: string;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  price: number;
  stockCount: number;
  user: string;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}
export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}