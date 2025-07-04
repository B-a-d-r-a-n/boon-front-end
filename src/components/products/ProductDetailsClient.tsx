"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import { AddToCartButton } from "./AddToCartButton";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ProductImageGallery } from "./ProductsImageGallery";
import { ReviewList } from "../reviews/ReviewList";
import { PostReviewForm } from "../reviews/PostReviewForm";
import { StarRatingDisplay } from "../reviews/StarRatingDisplay";
import { useGetProductBySlug } from "@/lib/queries/products";
import { WishlistButton } from "./WishlistButton";
import { useSession } from "next-auth/react";
import { DescriptionExpander } from "./DescriptionExpander";
interface ProductDetailsClientProps {
  product: Product;
  initialIsWishlisted: boolean;
}
export function ProductDetailsClient({
  product: initialProduct,
  initialIsWishlisted,
}: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();
  const { data: product } = useGetProductBySlug(
    initialProduct.slug,
    initialProduct
  );
  if (!product) return <div>Loading...</div>;
  return (
    <div className="container mx-auto p-4 sm:p-8 space-y-12">
      {}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
          <p className="text-lg text-muted-foreground mt-2">
            {product.brand.name}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <StarRatingDisplay rating={product.rating} />
            <span className="text-sm text-muted-foreground">
              ({product.numReviews} reviews)
            </span>
          </div>
          <p className="text-3xl font-bold my-4">${product.price.toFixed(2)}</p>
          <div className="text-foreground/80 leading-relaxed flex-grow">
            <DescriptionExpander text={product.description} />
          </div>
          <div className="flex items-stretch gap-3 mt-8">
            {}
            <div className="w-24 flex-shrink-0">
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
                }
                className="h-full text-center text-lg"
                aria-label="Quantity"
              />
            </div>
            {}
            <div className="flex-grow">
              <AddToCartButton productId={product._id} quantity={quantity} />
            </div>
            {}
            <div className="flex-shrink-0">
              <WishlistButton
                productId={product._id}
                isWishlisted={initialIsWishlisted}
              />
            </div>
          </div>
        </div>
      </div>
      {}
      <div className="border-t pt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {}
            <ReviewList reviews={product.reviews} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
            {session?.user ? (
              <PostReviewForm
                productId={product._id}
                productSlug={product.slug}
              />
            ) : (
              <p className="text-muted-foreground">
                You must be{" "}
                <Link href="/login" className="underline hover:text-primary">
                  logged in
                </Link>{" "}
                to post a review.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}