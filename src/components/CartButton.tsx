"use client";
import { useUser } from "@/lib/queries/user";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
export function CartButton() {
  const { data: user } = useUser();
  const itemCount =
    user?.cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  return (
    <Link href="/cart">
      <ShoppingCart />
      {itemCount > 0 && <span>{itemCount}</span>}
    </Link>
  );
}