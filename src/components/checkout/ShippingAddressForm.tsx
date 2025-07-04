"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { Address } from "@/types/auth";
const addressSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  address: z.string().min(5, "A valid street address is required."),
  city: z.string().min(2, "City is required."),
  postalCode: z.string().min(3, "A valid postal code is required."),
  country: z.string().min(2, "Country is required."),
});
type AddressInput = z.infer<typeof addressSchema>;
interface ShippingAddressFormProps {
  initialData?: Address | null;
  onAddressSubmit: (address: Address) => void;
}
export function ShippingAddressForm({
  initialData,
  onAddressSubmit,
}: ShippingAddressFormProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const form = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      address: initialData?.address || "",
      city: initialData?.city || "",
      postalCode: initialData?.postalCode || "",
      country: initialData?.country || "",
    },
  });
  const { isDirty } = form.formState;
  useEffect(() => {
    if (initialData && addressSchema.safeParse(initialData).success) {
      onAddressSubmit(initialData);
      setIsConfirmed(true);
    }
  }, [initialData, onAddressSubmit]);
  const onSubmit = (data: AddressInput) => {
    onAddressSubmit(data);
    setIsConfirmed(true);
    toast.success("Shipping address confirmed!");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
        <CardDescription>
          Enter the address where you&apos;d like to receive your order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setIsConfirmed(false);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main Street"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setIsConfirmed(false);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Anytown"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setIsConfirmed(false);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="12345"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setIsConfirmed(false);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="USA"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setIsConfirmed(false);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={!isDirty && isConfirmed}
            >
              {isConfirmed && !isDirty ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Address Confirmed
                </>
              ) : (
                "Confirm Address"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}