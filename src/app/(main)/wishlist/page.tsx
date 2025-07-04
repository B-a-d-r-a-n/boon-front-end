import { WishlistGrid } from "@/components/wishlist/WishlistGrid";
import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import Link from "next/link";
export default async function WishlistPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/wishlist");
  }
  const user = await userService.getMyProfileOnServer();
  if (!user || !user.wishlist || user.wishlist.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl p-4 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">My Wishlist</h1>
          <p className="mt-2 text-muted-foreground">
            Your collection of favorite items, saved for later.
          </p>
        </header>
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground mt-2">
            Add items you love to your wishlist to save them for later.
          </p>
          <Link
            href="/products"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Explore Products
          </Link>
        </Card>
      </div>
    );
  }
  return (
    <div className="container mx-auto max-w-7xl p-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">My Wishlist</h1>
        <p className="mt-2 text-muted-foreground">
          Your collection of favorite items, saved for later.
        </p>
      </header>
      {}
      <WishlistGrid initialItems={user.wishlist} />
    </div>
  );
}