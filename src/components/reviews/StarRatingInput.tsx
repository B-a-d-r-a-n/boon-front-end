"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
}
export function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  const [hoverValue, setHoverValue] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button" 
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          className="cursor-pointer"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className={cn(
              "h-6 w-6 transition-colors",
              (hoverValue || value) >= star
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}