import { EmptyState } from "@/components/empty-state";
import { useProduct, useUpdateURL } from "@/components/product/product-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { StarRating } from "@/components/ui/star-rating";
import { useReviewPageSize } from "@/hooks/use-review-page-size";
import { DataEntity } from "@/lib/product-review-types";
import { isNotNullish } from "@/lib/typeguards";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { RiChatSmile3Line } from "react-icons/ri";
import {
  useFilteredProductReviewCount,
  useProductReviewsQuery,
} from "../../hooks/use-product-reviews";

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
  const { state, removeOption } = useProduct();

  const defaultFilter = null;
  const ratingFilter = state.filterByRating ?? defaultFilter;
  const hasFilter = isNotNullish(ratingFilter);
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

  const hasReviews = reviewCount > 0;
  const { filteredReviewCount } = useFilteredProductReviewCount(
    productId,
    ratingFilter,
  );
  console.log(`🚀 ---------------🚀`);
  console.log(`🚀 ~ data:`, { data, ratingFilter });
  console.log(`🚀 ---------------🚀`);
  const filterHasReviews = filteredReviewCount > 0;

  const { pageSize } = useReviewPageSize();

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
      <DialogContent className="flex h-[calc(100%_-96px)] w-full max-w-[calc(100%_-_24px)] flex-col gap-8 overflow-hidden overflow-y-auto rounded-lg px-0 pt-[72px] md:max-w-[522px] lg:h-[calc(100%_-160px)] lg:max-w-[1008px] lg:flex-row">
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
                  className="flex-1"
                  formAction={() => {
                    const newState = removeOption("filterByRating");
                    updateURL(newState);
                  }}
                >
                  Clear Filter
                </Button>
              </form>
            )}
            <Button
              size="xl"
              variant="outline"
              className={cn(!hasFilter && "w-full")}
            >
              Write a review
            </Button>
          </div>
        </div>
        <div className="right-container flex-1 lg:m-auto">
          {hasReviews && filterHasReviews ? (
            <div className="flex h-full flex-col gap-6 overflow-hidden overflow-y-auto px-4">
              <div className="">
                {data?.pages.map((page) => {
                  if (!page.data) return null;
                  return (
                    <div key={page.pagination.page}>
                      <ReviewList data={page.data} />
                    </div>
                  );
                })}
              </div>
              <DialogFooter>
                {hasNextPage && (
                  <Button variant="secondary" size="lg" className="w-full">
                    Show {pageSize} more reviews
                  </Button>
                )}
              </DialogFooter>
            </div>
          ) : (
            <EmptyState
              className="h-fit p-6"
              header="No reviews yet!"
              subheader="Be the first to review this product"
              icon={<RiChatSmile3Line size={24} className="text-brand" />}
            />
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

function ReviewList({ data }: { data: DataEntity[] }) {
  return (
    <div className="flex flex-col gap-6">
      {data.map((review) => {
        const user = review.user;
        return (
          <div key={user.user_id} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Avatar className="h-12 w-12">
                {user.avatar_url && <AvatarImage src={user.avatar_url} />}
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="details flex flex-auto flex-col items-start gap-1">
                <div className="title flex w-full items-center justify-between">
                  <span className="font-semibold text-primary">
                    {user.name}
                  </span>
                  <span className="text-sm font-normal text-neutral-600">
                    {review.created_at}
                  </span>
                </div>
                <StarRating rating={review.rating} />
              </div>
            </div>

            <p className="text-base font-normal text-neutral-600">
              {review.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function getInitials(fullName: string): string {
  if (!fullName) return "";

  // Split the full name by spaces
  const nameParts = fullName.trim().split(" ");

  // Map each part to its first character and join them together
  const initials = nameParts
    .map((part) => (part && part[0] ? part[0].toUpperCase() : ""))
    .join("");

  return initials;
}
