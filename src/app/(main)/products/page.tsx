import { FilterControls } from "@/components/products/FilterControls";
import { PaginationControls } from "@/components/products/PaginationControls";
import { brandService } from "@/lib/services/brands";
import { categoryService } from "@/lib/services/categories";
import { productService } from "@/lib/services/products";
import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user";
import { ProductGrid } from "@/components/products/ProductsGrid";
interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedparams = await searchParams;
  const session = await auth();
  const [productsResponse, categories, brands, user] = await Promise.all([
    productService.fetchProducts(resolvedparams),
    categoryService.fetchCategories(),
    brandService.fetchBrands(),
    session ? userService.getMyProfileOnServer() : Promise.resolve(null),
  ]);
  const { data: products, pagination, priceRange } = productsResponse;
  const wishlistIds = new Set(
    user?.wishlist?.map((product) => product._id.toString()) ?? []
  );
  return (
    <>
      <div className="container mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">All Products</h1>
          <p className="text-muted-foreground mt-1">
            Showing{" "}
            {pagination.totalItems > 0
              ? (pagination.currentPage - 1) * pagination.itemsPerPage + 1
              : 0}
            -
            {Math.min(
              pagination.currentPage * pagination.itemsPerPage,
              pagination.totalItems
            )}{" "}
            of {pagination.totalItems} results
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <FilterControls
                categories={categories}
                brands={brands}
                priceRange={priceRange}
              />
            </div>
          </aside>
          <main className="lg:col-span-3">
            <div className="space-y-8">
              <ProductGrid products={products} wishlistIds={wishlistIds} />
              <PaginationControls pagination={pagination} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}