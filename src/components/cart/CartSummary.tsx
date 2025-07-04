"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
interface CartSummaryProps {
  subtotal: number;
  onCheckout: () => void;
}
export function CartSummary({ subtotal, onCheckout }: CartSummaryProps) {
  const shippingText = "Calculated at next step";
  const taxText = "Calculated at next step";
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Shipping</span>
          <span>{shippingText}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Tax</span>
          <span>{taxText}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onCheckout}
          className="w-full"
          disabled={subtotal === 0}
        >
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}