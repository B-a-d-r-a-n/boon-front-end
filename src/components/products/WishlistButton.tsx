"use client";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { toggleWishlistAction } from "@/actions/Wishlist";
interface WishlistButtonProps {
  productId: string;
  isWishlisted: boolean;
}
export function WishlistButton({
  productId,
  isWishlisted: initialIsWishlisted,
}: WishlistButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isPending, startTransition] = useTransition();
  const handleClick = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    setIsWishlisted((prev) => !prev);
    startTransition(async () => {
      const result = await toggleWishlistAction(productId);
      if (result?.error) {
        setIsWishlisted(initialIsWishlisted);
        toast.error(result.error);
      }
    });
  };
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-full aspect-square"
      onClick={handleClick}
      disabled={isPending}
      aria-label="Toggle Wishlist"
    >
      {isPending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Heart
          className={cn(
            "h-5 w-5 transition-all",
            isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"
          )}
        />
      )}
    </Button>
  );
}
