"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { CartItem } from "@/types/cart";
interface CartItemsDisplayProps {
  items: CartItem[];
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}
export function CartItemsDisplay({
  items,
  onQuantityChange,
  onRemoveItem,
}: CartItemsDisplayProps) {
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    onQuantityChange(productId, Math.max(1, newQuantity));
  };
  return (
    <Card>
      <CardContent className="p-4 sm:p-6 divide-y">
        {items.map((item) => (
          <div key={item.product._id} className="flex gap-4 py-4">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link
                  href={`/products/${item.product.slug}`}
                  className="font-semibold hover:underline"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  ${item.product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      handleQuantityChange(item.product._id, item.quantity - 1)
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center text-sm">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      handleQuantityChange(item.product._id, item.quantity + 1)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(item.product._id)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}