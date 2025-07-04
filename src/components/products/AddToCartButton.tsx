"use client";
import { useAddToCart } from "@/lib/queries/user"; 
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
}
export function AddToCartButton({
  productId,
  quantity = 1,
}: AddToCartButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate: addToCart, isPending } = useAddToCart();
  const handleAddToCart = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    addToCart({ productId, quantity });
  };
  return (
    <Button
      onClick={handleAddToCart}
      disabled={isPending}
      className="w-full h-full text-base"
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <ShoppingCart className="mr-2 h-4 w-4" />
      )}
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}