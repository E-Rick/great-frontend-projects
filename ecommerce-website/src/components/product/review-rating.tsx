import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";

export function ReviewRating({
  reviewCount,
  rating,
}: {
  reviewCount: number;
  rating: number;
}) {
  const roundedRating = Math.round(rating * 10) / 10;
  const hasReviews = reviewCount > 0;

  return (
    <div className="gap-y-.5 flex w-full flex-wrap items-center gap-x-2">
      <span className="text-xl font-medium text-primary">{roundedRating}</span>
      <StarRating rating={rating} />
      {hasReviews ? (
        <Button variant="link" size="md" className="min-w-fit lg:text-sm">
          See all {reviewCount} reviews
        </Button>
      ) : (
        <div className="inline-flex gap-0.5 py-1 text-center">
          <span className="text-sm">No Reviews Yet.</span>{" "}
          <Button variant="link" size="md" className="min-w-fit lg:text-sm">
            Be the first.
          </Button>
        </div>
      )}
    </div>
  );
}
