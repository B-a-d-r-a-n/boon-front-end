import Link from "next/link";
import { Twitter, Instagram, Facebook } from "lucide-react";
export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-12">
        {}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="font-bold text-xl text-foreground">
            Boon
          </Link>
          <p className="text-sm">Curated products for a better life.</p>
          <div className="flex space-x-4">
            <Link
              href="#"
              aria-label="Twitter"
              className="hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="hover:text-foreground"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              aria-label="Facebook"
              className="hover:text-foreground"
            >
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>
        {}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Shop</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/products" className="hover:text-foreground">
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/products?sort=-createdAt"
                className="hover:text-foreground"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                href="/products?isFeatured=true"
                className="hover:text-foreground"
              >
                Featured
              </Link>
            </li>
          </ul>
        </div>
        {}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        {}
        <div>
          <h4 className="font-semibold text-foreground mb-4">
            Join Our Newsletter
          </h4>
          <p className="text-sm mb-4">
            Get the latest updates on new products and upcoming sales.
          </p>
          {}
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-background border border-border p-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-primary-foreground p-2 rounded-r-md hover:bg-primary/90">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      {}
      <div className="border-t">
        <div className="container mx-auto flex justify-between items-center py-4 px-6 text-sm">
          <p>© {new Date().getFullYear()} Boon. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}