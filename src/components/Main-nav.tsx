import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { SearchBar } from "./SearchBar";
import { ShoppingCart } from "lucide-react";
import UserAccountNav from "./User-account-nav";
import { ThemeToggle } from "./ThemeToggle";
export default async function MainNav() {
  const session = await auth();
  const user = session?.user;
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        {}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-lg">Boon</span>
        </Link>
        {}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/products"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            All Products
          </Link>
          {}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {}
          <div className="flex-1 hidden sm:flex justify-center px-4">
            <SearchBar />
          </div>
          {}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" aria-label="Open cart">
              <ShoppingCart className="h-5 w-5" />
              {}
            </Link>
          </Button>
          {}
          <ThemeToggle />
          {user ? (
            <UserAccountNav user={user} />
          ) : (
            <>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
