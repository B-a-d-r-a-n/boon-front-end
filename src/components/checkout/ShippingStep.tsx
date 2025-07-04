"use client";
import { useState } from "react";
import { Address, PopulatedUser } from "@/types/auth";
import { ShippingAddressForm } from "./ShippingAddressForm";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { DeliveryMethod } from "@/types/order";
interface ShippingStepProps {
  user: PopulatedUser;
  deliveryMethods: DeliveryMethod[];
  onConfirm: (address: Address, deliveryMethod: DeliveryMethod) => void;
}
export function ShippingStep({
  user,
  deliveryMethods,
  onConfirm,
}: ShippingStepProps) {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryMethod | null>(null);
  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <ShippingAddressForm
          initialData={user.shippingAddress}
          onAddressSubmit={(address) => setSelectedAddress(address)}
        />
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={(value) =>
                setSelectedDelivery(
                  deliveryMethods.find((d) => d._id === value) || null
                )
              }
            >
              <div className="space-y-4">
                {deliveryMethods.map((method) => (
                  <Label
                    key={method._id}
                    htmlFor={method._id}
                    className="flex justify-between items-center rounded-md border p-4 cursor-pointer"
                  >
                    <div>
                      <p className="font-semibold">{method.shortName}</p>
                      <p className="text-sm text-muted-foreground">
                        {method.deliveryTime}
                      </p>
                    </div>
                    <p className="font-semibold">${method.price.toFixed(2)}</p>
                    <RadioGroupItem value={method._id} id={method._id} />
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        <Button
          className="w-full"
          disabled={!selectedAddress || !selectedDelivery}
          onClick={() => onConfirm(selectedAddress!, selectedDelivery!)}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}