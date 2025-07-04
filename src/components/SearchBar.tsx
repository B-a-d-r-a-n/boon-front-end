"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(defaultQuery);
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/products?q=${encodeURIComponent(query.trim())}`);
  };
  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-lg">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="h-10 pr-10"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        aria-label="Submit search"
      >
        <Search className="h-5 w-5 text-muted-foreground" />
      </button>
    </form>
  );
}