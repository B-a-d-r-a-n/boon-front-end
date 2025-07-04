"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useCreateOrder } from "@/lib/queries/order";
import { CartItem } from "@/types/cart";
import { Address } from "@/types/auth";
import { toast } from "sonner"; 
interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingAddress: Address | null;
}
export function OrderSummary({
  items,
  subtotal,
  shippingAddress,
}: OrderSummaryProps) {
  const router = useRouter();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const shippingCost = 5.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;
  const handlePlaceOrder = () => {
    if (
      !shippingAddress ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country ||
      !shippingAddress.fullName
    ) {
      toast.error(
        "Please confirm your shipping address before placing the order."
      );
      return;
    }
    const orderPayload = {
      orderItems: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
        fullName: shippingAddress.fullName,
      },
      paymentMethod: "Stripe", 
      itemsPrice: subtotal,
      shippingPrice: shippingCost,
      taxPrice: tax,
      totalPrice: total,
    };
    createOrder(orderPayload, {
      onSuccess: (newOrder) => {
        router.push(`/orders/${newOrder._id}/confirmation`);
      },
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {}
        <div className="space-y-2 text-sm">
          {items.map((item) => (
            <div key={item.product._id} className="flex justify-between">
              <span className="text-muted-foreground">
                {item.product.name} x {item.quantity}
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <Separator />
        {}
        <div className="space-y-2">{}</div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handlePlaceOrder}
          className="w-full"
          disabled={isPending || !shippingAddress}
        >
          {isPending ? "Placing Order..." : "Place Order"}
        </Button>
      </CardFooter>
    </Card>
  );
}