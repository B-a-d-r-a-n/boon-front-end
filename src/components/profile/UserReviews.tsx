import { Card } from "../ui/card";
import Link from "next/link";
import { ReviewWithProduct } from "@/types/review";
import { StarRatingDisplay } from "../reviews/StarRatingDisplay";
interface UserReviewsProps {
  reviews: ReviewWithProduct[];
}
export function UserReviews({ reviews }: UserReviewsProps) {
  if (reviews.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          You haven&apos;t written any reviews yet.
        </p>
      </Card>
    );
  }
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review._id} className="p-4">
          <p className="text-sm text-muted-foreground">
            For product:
            <Link
              href={`/products/${review.product.slug}`}
              className="font-semibold text-primary hover:underline ml-1"
            >
              {review.product.name}
            </Link>
          </p>
          <div className="flex items-center my-2">
            <StarRatingDisplay rating={review.rating} />
            <span className="ml-2 text-xs text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-foreground/90">{review.comment}</p>
        </Card>
      ))}
    </div>
  );
}