import { productService } from "@/lib/services/products";
import { ProductDetailsClient } from "@/components/products/ProductDetailsClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await productService.fetchProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }
  return { title: product.name, description: product.description };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  // Await the params promise to get the slug
  const { slug } = await params;
  const session = await auth();

  const [product, user] = await Promise.all([
    productService.fetchProductBySlug(slug),
    session ? userService.getMyProfileOnServer() : Promise.resolve(null),
  ]);

  if (!product) {
    notFound();
  }

  const isWishlisted = !!user?.wishlist?.some(
    (wishlistProduct) => wishlistProduct._id === product._id
  );

  return (
    <ProductDetailsClient
      product={product}
      initialIsWishlisted={isWishlisted}
    />
  );
}
