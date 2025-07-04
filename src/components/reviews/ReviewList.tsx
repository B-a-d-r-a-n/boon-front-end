import { Review } from "@/types/product";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarRatingDisplay } from "./StarRatingDisplay";
import { Separator } from "../ui/separator";
interface ReviewListProps {
  reviews: Review[];
}
export function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="border rounded-lg p-6 text-center">
        <p className="text-muted-foreground">No reviews yet. Be the first!</p>
      </div>
    );
  }
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <div className="space-y-6">
      {sortedReviews.map((review, index) => (
        <div key={review._id}>
          <div className="flex gap-4">
            <Avatar>
              {}
              <AvatarImage
                src={review.user?.avatarUrl}
                alt={review.user?.name ?? "User"}
              />
              <AvatarFallback>
                {review.user?.name?.charAt(0).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  {review.user?.name ?? "Anonymous"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <StarRatingDisplay rating={review.rating} className="my-1" />
              <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>
          {index < sortedReviews.length - 1 && <Separator className="mt-6" />}
        </div>
      ))}
    </div>
  );
}