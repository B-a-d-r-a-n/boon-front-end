import { productService } from "@/lib/services/products";
import { ProductDetailsClient } from "@/components/products/ProductDetailsClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user";
interface ProductDetailPageProps {
  params: { slug: string };
}
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const resolvedparams = await params;
  const product = await productService.fetchProductBySlug(resolvedparams.slug);
  if (!product) return { title: "Product Not Found" };
  return { title: product.name, description: product.description };
}
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedparams = await params;
  const session = await auth();
  const [product, user] = await Promise.all([
    productService.fetchProductBySlug(resolvedparams.slug),
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
