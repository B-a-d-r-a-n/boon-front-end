import { Review } from "./product";
export interface ReviewWithProduct extends Review {
  product: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
}