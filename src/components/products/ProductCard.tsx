import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types/product";
import { AddToCartButton } from "./AddToCartButton";
import { WishlistButton } from "./WishlistButton";
interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
}
export function ProductCard({ product, isWishlisted }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <Link
        href={`/products/${product.slug}`}
        className="group flex flex-col flex-grow"
      >
        <div className="aspect-square w-full overflow-hidden relative">
          <Image
            src={product.images[0] ?? "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          {}
          {product.brand && (
            <p className="text-sm text-muted-foreground">
              {product.brand.name}
            </p>
          )}
          <h3 className="text-base font-semibold group-hover:text-primary mt-1 flex-grow">
            {product.name}
          </h3>
          <p className="font-bold text-lg mt-2">${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      {}
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full items-center gap-2">
          {}
          <div className="flex-grow">
            <AddToCartButton productId={product._id} />
          </div>
          {}
          <div className="flex-shrink-0">
            <WishlistButton
              productId={product._id}
              isWishlisted={isWishlisted}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}