"use client";
import {
  useUser,
  useUpdateCartQuantity,
  useRemoveFromCart,
} from "@/lib/queries/user";
import { CartItemsDisplay } from "./CartItemsDisplay";
import { CartSummary } from "./CartSummary";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCreateOrder } from "@/lib/queries/order";
function CartPageSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-4">
        {}
        <div className="flex gap-4 p-4 border rounded-lg">
          <Skeleton className="h-24 w-24 flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-32 mt-auto" />
          </div>
        </div>
        {}
        <div className="flex gap-4 p-4 border rounded-lg">
          <Skeleton className="h-24 w-24 flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-32 mt-auto" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <Skeleton className="h-72 w-full" />
      </div>
    </div>
  );
}
export function CartView() {
  const router = useRouter();
  const { data: user, isLoading, error } = useUser();
  const { mutate: updateQuantity } = useUpdateCartQuantity();
  const { mutate: removeItem } = useRemoveFromCart();
  const validCartItems = useMemo(
    () => user?.cart?.filter((item) => !!item.product) ?? [],
    [user]
  );
  const subtotal = useMemo(
    () =>
      validCartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
    [validCartItems]
  );
  const handleCheckout = () => {
    router.push("/checkout");
  };
  if (isLoading) {
    return <CartPageSkeleton />;
  }
  if (error) {
    return (
      <p className="text-destructive text-center py-8">
        Could not load your cart. Please try again.
      </p>
    );
  }
  if (!user || validCartItems.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-xl font-semibold">Your Cart is Empty</h2>
        <p className="text-muted-foreground mt-2">
          Time to find something you'll love.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </Card>
    );
  }
  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <CartItemsDisplay
          items={validCartItems}
          onQuantityChange={(productId, newQuantity) =>
            updateQuantity({ productId, quantity: newQuantity })
          }
          onRemoveItem={removeItem}
        />
      </div>
      <div className="lg:col-span-1 sticky top-24">
        <CartSummary
          subtotal={subtotal}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}