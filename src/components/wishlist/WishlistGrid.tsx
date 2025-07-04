import { Product } from "@/types/product";
import { ProductCard } from "../products/ProductCard";
interface WishlistGridProps {
  initialItems: Product[];
}
export function WishlistGrid({ initialItems }: WishlistGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {initialItems.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isWishlisted={true}
        />
      ))}
    </div>
  );
}