import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
interface StarRatingDisplayProps {
  rating: number;
  maxRating?: number;
  className?: string;
}
export function StarRatingDisplay({
  rating,
  maxRating = 5,
  className,
}: StarRatingDisplayProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        return (
          <Star
            key={index}
            className={cn(
              "h-4 w-4", 
              isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            )}
          />
        );
      })}
    </div>
  );
}