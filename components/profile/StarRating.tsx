// /app/components/profile/StarRating.tsx
"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface StarRatingProps {
  onSubmitRating: (rating: number) => void;
}

export const StarRating = ({ onSubmitRating }: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmitRating(rating);
      // Optional: Add logic to show a "Thank you" message
      alert(`You've submitted a rating of ${rating} stars!`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <button
              type="button"
              key={ratingValue}
              className="focus:outline-none"
              onClick={() => setRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                className={cn(
                  "h-8 w-8 transition-colors duration-150",
                  ratingValue <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-zinc-300 dark:text-zinc-600"
                )}
              />
            </button>
          );
        })}
      </div>
      <Button onClick={handleSubmit} disabled={rating === 0}>
        Submit Rating
      </Button>
    </div>
  );
};
