import { StarRating } from "@/app/product/[id]/ui/star-rating";
import { Button } from "@/components/ui/button";

export function ReviewRating({
  reviewCount,
  rating,
}: {
  reviewCount: number;
  rating: number;
}) {
  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-normal text-primary">{roundedRating}</span>
      <StarRating rating={rating} />
      <Button variant="link" size="lg">
        See all {reviewCount} reviews
      </Button>
    </div>
  );
}
