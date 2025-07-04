import { CartView } from "@/components/cart/CartView";
import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user";
import { redirect } from "next/navigation";
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { userKeys } from "@/lib/queries/keys";
export default async function CartPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/cart");
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: userKeys.profile(session.user.email),
    queryFn: userService.getMyProfileOnServer,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="container mx-auto max-w-5xl p-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Your Shopping Cart
        </h1>
      </header>
      {}
      <HydrationBoundary state={dehydratedState}>
        <CartView />
      </HydrationBoundary>
    </div>
  );
}