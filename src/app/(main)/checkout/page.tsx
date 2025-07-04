import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user";
import { deliveryService } from "@/lib/services/delivery";
import { redirect } from "next/navigation";
import { CheckoutView } from "@/components/checkout/CheckoutView";
async function getCheckoutData() {
  const session = await auth();
  if (!session?.user) {
    return { user: null, deliveryMethods: [] };
  }
  const [user, deliveryMethods] = await Promise.all([
    userService.getMyProfileOnServer(),
    deliveryService.getDeliveryMethods(),
  ]);
  return { user, deliveryMethods };
}
export default async function CheckoutPage() {
  const { user, deliveryMethods } = await getCheckoutData();
  if (!user || user.cart.length === 0) {
    redirect("/cart");
  }
  return (
    <div className="container mx-auto max-w-5xl p-4 py-8 md:py-12">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Checkout</h1>
      </header>
      {}
      <CheckoutView initialUser={user} deliveryMethods={deliveryMethods} />
    </div>
  );
}