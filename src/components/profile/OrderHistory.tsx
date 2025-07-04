import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import Image from "next/image";
import Link from "next/link";
interface OrderHistoryProps {
  orders: Order[];
}
export function OrderHistory({ orders }: OrderHistoryProps) {
  if (!orders || orders.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          You haven&apos;t placed any orders yet.
        </p>
        <Link
          href="/products"
          className="text-primary hover:underline mt-2 inline-block"
        >
          Start Shopping
        </Link>
      </Card>
    );
  }
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {orders.map((order, index) => (
        <Card key={order._id}>
          <AccordionItem value={`item-${index}`} className="border-b-0">
            <AccordionTrigger className="p-4 hover:no-underline">
              <div className="flex justify-between w-full">
                <div className="text-left">
                  <p className="font-semibold">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${order.totalPrice.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      order.isDelivered ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4 border-t">
                <ul className="space-y-4">
                  {order.orderItems.map((item) => (
                    <li key={item.product} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Card>
      ))}
    </Accordion>
  );
}