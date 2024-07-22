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
    <div className="flex items-center w-full gap-2">
      <span className="text-xl font-medium text-primary">{roundedRating}</span>
      <StarRating rating={rating} />
      <Button variant="link" size="md" className="min-w-fit lg:text-sm">
        See all {reviewCount} reviews
      </Button>
    </div>
  );
}
