import { EmptyState } from "@/components/empty-state";
import { useProduct, useUpdateURL } from "@/components/product/product-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { StarRating } from "@/components/ui/star-rating";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { RiChatSmile3Line } from "react-icons/ri";
import { useProductReviewsQuery } from "../../hooks/use-product-reviews";

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
  const { state, removeOption } = useProduct();

  const defaultFilter = undefined;
  const ratingFilter = state.filterByRating ?? defaultFilter;
  const hasFilter = ratingFilter !== undefined;
  const updateURL = useUpdateURL();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useProductReviewsQuery(productId, ratingFilter);

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
            <DialogDescription className="gap-y-.5 flex w-full flex-wrap items-center gap-x-2">
              <span className="text-base font-semibold text-primary">
                {roundedRating}
              </span>
              <StarRating rating={rating} />
              {hasReviews && (
                <span className="text-sm font-normal text-neutral-600">
                  Based on {reviewCount} reviews
                </span>
              )}
            </DialogDescription>
          </div>
          <RatingValues productId={productId} />
          <div className="flex w-full justify-center gap-6">
            {hasFilter && (
              <form>
                <Button
                  size="xl"
                  variant="tertiary"
                  formAction={() => {
                    const newState = removeOption("filterByRating");
                    updateURL(newState);
                  }}
                >
                  Clear Filter
                </Button>
              </form>
            )}
            <Button size="xl" variant="outline">
              Write a review
            </Button>
          </div>
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

type RatingValue = {
  label: string;
  color: string;
  rating: number;
  countsIndex: number;
};

const RATINGS: RatingValue[] = [
  {
    label: "Excellent",
    color: "bg-green-600",
    rating: 5,
    countsIndex: 4,
  },
  {
    label: "Good",
    color: "bg-green-500",
    rating: 4,
    countsIndex: 3,
  },
  {
    label: "Average",
    color: "bg-yellow-300",
    rating: 3,
    countsIndex: 2,
  },
  {
    label: "Below Average",
    color: "bg-yellow-500",
    rating: 2,
    countsIndex: 1,
  },
  {
    label: "Poor",
    color: "bg-red-600",
    rating: 1,
    countsIndex: 0,
  },
];

function RatingValues({ productId }: { productId: string }) {
  return (
    <div className="flex w-full flex-col gap-3 py-4">
      {RATINGS.map((ratingValue) => {
        return (
          <RatingValue
            key={ratingValue.color}
            productId={productId}
            {...ratingValue}
          />
        );
      })}
    </div>
  );
}

type RatingValueProps = RatingValue & {
  productId: string;
};

function RatingValue({
  productId,
  color,
  countsIndex,
  label,
  rating,
}: RatingValueProps) {
  const { state, updateOption } = useProduct();
  const { data } = useProductReviewsQuery(productId);

  // const defaultFilter = undefined;
  // const ratingFilter = state.filterByRating ?? defaultFilter;
  const updateURL = useUpdateURL();

  const aggregate = data?.pages[0]?.aggregate;
  const count = aggregate?.counts?.[countsIndex]?.count ?? 0;
  const total = aggregate?.total ?? 1;
  const ratio = count / total;

  const percentage = useMemo(
    () => Math.round(isNaN(ratio) ? 0 : ratio * 100),
    [ratio],
  );

  const isActive = Number(state?.filterByRating) === rating;

  return (
    <form className="flex items-center gap-2">
      <Button
        variant="link-gray"
        size="lg"
        className={cn("min-w-[120px] text-disabled", isActive && "text-brand")}
        formAction={() => {
          const newState = updateOption("filterByRating", rating.toString());
          updateURL(newState);
        }}
      >
        <span className="mr-auto">{label}</span>
      </Button>
      <Progress
        value={percentage}
        className={`w-full`}
        indicatorColor={color}
      />
      <span className="min-w-[42px] text-right text-neutral-600">
        {percentage}%
      </span>
    </form>
  );
}
