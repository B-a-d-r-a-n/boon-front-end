"use client";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Address, PopulatedUser } from "@/types/auth";
import { ShippingStep } from "./ShippingStep";
import { PaymentStep } from "./PaymentStep";
import { Skeleton } from "../ui/skeleton";
import { DeliveryMethod } from "@/types/order";
import { useCreateOrder } from "@/lib/queries/order";

interface CheckoutViewProps {
  initialUser: PopulatedUser;
  deliveryMethods: DeliveryMethod[];
}

function CheckoutSkeleton() {
  return (
    <div className="grid md:grid-cols-5 gap-8 items-start">
      <div className="md:col-span-3 space-y-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
      <div className="md:col-span-2">
        <Skeleton className="h-80 w-full" />
      </div>
    </div>
  );
}

export function CheckoutView({
  initialUser,
  deliveryMethods,
}: CheckoutViewProps) {
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [confirmedAddress, setConfirmedAddress] = useState<Address | null>(
    initialUser.shippingAddress || null
  );
  const [confirmedDelivery, setConfirmedDelivery] =
    useState<DeliveryMethod | null>(null);
  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const [paymentMethod, setPaymentMethod] = useState<string>("Stripe");

  const validCartItems = useMemo(
    () => initialUser.cart.filter((item) => !!item.product),
    [initialUser.cart]
  );
  const subtotal = useMemo(
    () =>
      validCartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
    [validCartItems]
  );

  const handlePlaceOrder = () => {
    if (!confirmedAddress || !confirmedDelivery) {
      toast.error("Please confirm your shipping and delivery details.");
      return;
    }
    const shippingPrice = confirmedDelivery.price;
    const taxPrice = subtotal * 0.08;
    const totalPrice = subtotal + shippingPrice + taxPrice;
    const orderPayload = {
      orderItems: validCartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      shippingAddress: confirmedAddress,
      paymentMethod: paymentMethod,
      itemsPrice: subtotal,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    createOrder(orderPayload);
  };

  if (step === "shipping") {
    return (
      <ShippingStep
        user={initialUser}
        deliveryMethods={deliveryMethods}
        onConfirm={(address, delivery) => {
          setConfirmedAddress(address);
          setConfirmedDelivery(delivery);
          setStep("payment");
        }}
      />
    );
  }

  if (step === "payment" && (!confirmedAddress || !confirmedDelivery)) {
    return <CheckoutSkeleton />;
  }

  if (step === "payment") {
    return (
      <PaymentStep
        items={validCartItems}
        shippingAddress={confirmedAddress!}
        deliveryMethod={confirmedDelivery!}
        subtotal={subtotal}
        onPlaceOrder={handlePlaceOrder}
        isPlacingOrder={isCreatingOrder}
        selectedPaymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        onBack={() => setStep("shipping")}
      />
    );
  }

  return null;
}
