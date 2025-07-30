import { OrderHistory } from "@/components/profile/OrderHistory";
import { UserReviews } from "@/components/profile/UserReviews";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { orderService } from "@/lib/services/order";
import { reviewService } from "@/lib/services/reviews";
import { Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/profile");
  }
  const [orderHistory, userReviews] = await Promise.all([
    orderService.getMyOrdersOnServer(),
    reviewService.getMyReviews(),
  ]);
  return (
    <div className="container mx-auto max-w-5xl p-4 py-8 md:py-12">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">My Account</h1>
          <p className="mt-2 text-muted-foreground">
            View your orders and past reviews.
          </p>
        </div>
        <div>
          <Button variant="outline" size="icon" asChild>
            <Link href="/profile/settings" aria-label="Account Settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </header>
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="mt-6">
          <OrderHistory orders={orderHistory} />
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <UserReviews reviews={userReviews} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
