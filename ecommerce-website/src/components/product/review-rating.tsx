import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { StarRating } from "@/components/ui/star-rating";
import { useProductReviewData } from "@/hooks/use-product-reviews";
import { RiChatSmile3Line } from "react-icons/ri";

export function ReviewRating({
  reviewCount,
  rating,
  productId,
}: {
  reviewCount: number;
  rating: number;
  productId: string;
}) {
  const roundedRating = Math.round(rating * 10) / 10;
  const hasReviews = reviewCount > 0;

  return (
    <Dialog>
      <div className="gap-y-.5 flex w-full flex-wrap items-center gap-x-2">
        <span className="text-xl font-medium text-primary">
          {roundedRating}
        </span>
        <StarRating rating={rating} />
        {hasReviews ? (
          <DialogTrigger asChild>
            <Button variant="link" size="md" className="min-w-fit lg:text-sm">
              See all {reviewCount} reviews
            </Button>
          </DialogTrigger>
        ) : (
          <div className="inline-flex gap-0.5 py-1 text-center">
            <span className="text-sm">No Reviews Yet.</span>{" "}
            <DialogTrigger asChild>
              <Button variant="link" size="md" className="min-w-fit lg:text-sm">
                Be the first.
              </Button>
            </DialogTrigger>
          </div>
        )}
      </div>
      <DialogContent className="flex w-full max-w-[calc(100%_-_24px)] flex-col gap-8 rounded-lg px-0 pt-[72px] md:max-w-[522px] lg:max-w-[1008px] lg:flex-row">
        <div className="left-container flex shrink-0 flex-col gap-6 px-3">
          <div className="heading flex flex-col gap-2 lg:min-w-[312px]">
            <DialogTitle>Overall Rating</DialogTitle>
            <div className="gap-y-.5 flex w-full flex-wrap items-center gap-x-2">
              <span className="text-base font-semibold text-primary">
                {roundedRating}
              </span>
              <StarRating rating={rating} />
            </div>
          </div>
          <RatingValues productId={productId} />
          <Button size="xl" variant="outline">
            Write a review
          </Button>
        </div>
        <div className="right-container m-auto flex-1">
          {reviewCount === 0 ? (
            <EmptyState
              header="No reviews yet!"
              subheader="Be the first to review this product"
              icon={<RiChatSmile3Line size={24} className="text-brand" />}
            />
          ) : (
            <div></div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const LABELS = ["Excellent", "Good", "Average", "Below Average", "Poor"];

function RatingValues({ productId }: { productId: string }) {
  const data = useProductReviewData(productId);
  console.log(`🚀 ---------------🚀`);
  console.log(`🚀 ~ data:`, data);
  console.log(`🚀 ---------------🚀`);
  return (
    <div className="flex w-full flex-col gap-3 py-4">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <div key={i} className="flex items-center gap-2">
            <Button
              variant="link"
              size="lg"
              className="min-w-[120px] text-disabled"
            >
              <span className="mr-auto">{LABELS[i]}</span>
            </Button>
            <Progress className="w-full" />
            <span className="min-w-[42px] text-right">0%</span>
          </div>
        );
      })}
    </div>
  );
}
