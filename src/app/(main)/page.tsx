import { CategoryCard } from "@/components/categories/CategoryCard"; 
import { HeroCarousel } from "@/components/hero/HeroCarousel";
import { ProductCard } from "@/components/products/ProductCard";
import { auth } from "@/lib/auth";
import { categoryService } from "@/lib/services/categories";
import { commercialService } from "@/lib/services/commercial";
import { productService } from "@/lib/services/products";
import { userService } from "@/lib/services/user";
export default async function HomePage() {
  const session = await auth();
  const [featuredProducts, categories, user, commercials] = await Promise.all([
    productService.fetchProducts({ isFeatured: true, limit: 8 }),
    categoryService.fetchCategories(),
    session ? userService.getMyProfileOnServer() : Promise.resolve(null),
    commercialService.getCommercials(), 
  ]);
  const wishlistIds = new Set(
    user?.wishlist?.map((item) => item._id.toString())
  );
  return (
    <>
      <section className="mb-12">
        {}
        <HeroCarousel commercials={commercials} />
      </section>
      <main className="container mx-auto p-4 space-y-12">
        {}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </section>
        {}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.data.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isWishlisted={wishlistIds.has(product._id)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}