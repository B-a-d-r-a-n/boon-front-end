"use client";
import { CartItem } from "@/types/cart";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Address } from "@/types/auth";
import { DeliveryMethod } from "@/types/order";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "../ui/label";
import { CreditCard, Wallet } from "lucide-react";
import { RadioGroup } from "../ui/radio-group";
interface PaymentStepProps {
  items: CartItem[];
  shippingAddress: Address;
  deliveryMethod: DeliveryMethod;
  subtotal: number;
  onPlaceOrder: () => void;
  isPlacingOrder: boolean;
  onBack: () => void;
  onPaymentMethodChange: (method: string) => void; 
  selectedPaymentMethod: string; 
}
export function PaymentStep({
  onPaymentMethodChange,
  selectedPaymentMethod,
  shippingAddress,
  deliveryMethod,
  subtotal,
  onPlaceOrder,
  isPlacingOrder,
  onBack,
}: PaymentStepProps) {
  const shippingCost = deliveryMethod.price;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;
  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        {}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Select how you'd like to pay.</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedPaymentMethod}
              onValueChange={onPaymentMethodChange}
              className="space-y-4"
            >
              {}
              <Label
                htmlFor="card"
                className="flex items-center gap-4 rounded-md border-2 p-4 cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="Stripe" id="card" />
                <CreditCard className="h-6 w-6" />
                <span className="font-semibold">Credit / Debit Card</span>
              </Label>
              {}
              <Label
                htmlFor="paypal"
                className="flex items-center gap-4 rounded-md border-2 p-4 cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="PayPal" id="paypal" />
                <Wallet className="h-6 w-6" />
                <span className="font-semibold">PayPal</span>
              </Label>
            </RadioGroup>
          </CardContent>
        </Card>
        {}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Shipping To</CardTitle>
            <Button variant="link" onClick={onBack} className="p-0 h-auto">
              Change
            </Button>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>{shippingAddress.fullName}</p>
            <p>{shippingAddress.address}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.postalCode}
            </p>
          </CardContent>
        </Card>
      </div>
      {}
      <div className="sticky top-24">
        <Card>
          <CardHeader>
            <CardTitle>Order Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {}
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
          className="w-full mt-6"
        >
          {isPlacingOrder ? "Processing..." : "Confirm & Place Order"}
        </Button>
      </div>
    </div>
  );
}