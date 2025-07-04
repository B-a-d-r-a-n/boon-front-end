import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
interface ProductGridProps {
  products: Product[];
  wishlistIds: Set<string>;
}
export function ProductGrid({ products, wishlistIds }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold">No Products Found</h2>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isWishlisted={wishlistIds.has(product._id)}
        />
      ))}
    </div>
  );
}