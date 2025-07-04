"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateReview } from "@/lib/queries/products"; 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StarRatingInput } from "./StarRatingInput";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
const reviewSchema = z.object({
  rating: z.coerce.number().min(1, "Please select a rating.").max(5),
  comment: z
    .string()
    .min(10, "Review must be at least 10 characters long.")
    .max(500),
});
type ReviewInput = z.infer<typeof reviewSchema>;
interface PostReviewFormProps {
  productId: string;
  productSlug: string; 
}
export function PostReviewForm({
  productId,
  productSlug,
}: PostReviewFormProps) {
  const { mutate: createReview, isPending } = useCreateReview(productSlug);
  const form = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "" },
  });
  const onSubmit = (data: ReviewInput) => {
    createReview(
      { productId, reviewData: data },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };
  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Rating</FormLabel>
                  <FormControl>
                    <StarRatingInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you like or dislike? What did you use this product for?"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}