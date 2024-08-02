import { EmptyState } from "@/components/empty-state";
import { useProduct, useUpdateURL } from "@/components/product/product-context";
import { hasData } from "@/components/review/helpers";
import { RatingValues } from "@/components/review/rating-values";
import { ReviewList } from "@/components/review/review-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StarRating } from "@/components/ui/star-rating";
import {
  useFilteredProductReviewCount,
  useProductReviewsQuery,
} from "@/hooks/use-product-reviews";
import { useReviewPageSize } from "@/hooks/use-review-page-size";
import { cn } from "@/lib/utils";
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
  const { state, removeOption } = useProduct();
  const { pageSize } = useReviewPageSize();
  const updateURL = useUpdateURL();

  const defaultFilter = ""; // TODO: Add in write-up edge case where API doesn't return consistent data when using null.
  const ratingFilter = state.filterByRating ?? defaultFilter;
  const hasFilterParam = state.filterByRating !== undefined;

  // TODO: Add error handling and better UX when clicking buttons rapidly for filtering
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
  const filterHasReviews = filteredReviewCount > 0;
  const dataExists = hasData(data);
  const roundedRating = Math.round(rating * 10) / 10;

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
      <DialogContent className="flex h-[calc(100%_-96px)] w-full max-w-[calc(100%_-_24px)] flex-col gap-8 overflow-hidden overflow-y-auto rounded-lg px-0 pt-[72px] md:max-w-[522px] md:pb-0 lg:h-[calc(100%_-160px)] lg:max-w-[1008px] lg:flex-row">
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
            {hasFilterParam && (
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
              className={cn(!hasFilterParam && "w-full")}
            >
              Write a review
            </Button>
          </div>
        </div>
        <div className="right-container flex-1 lg:mx-auto">
          {dataExists && hasReviews && filterHasReviews ? (
            <div className="scrollbox flex h-full flex-col gap-6 overflow-auto px-4">
              <div className="flex flex-col justify-start gap-6">
                {data?.pages.map((page) => {
                  // if (!page.data) return null;
                  return (
                    <ReviewList key={page.pagination.page} data={page.data} />
                  );
                })}
              </div>
              <DialogFooter className="py-6">
                {hasNextPage && (
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={() => fetchNextPage()}
                  >
                    {isFetchingNextPage
                      ? "Loading more..."
                      : `Show ${pageSize} more reviews`}
                  </Button>
                )}
              </DialogFooter>
            </div>
          ) : (
            <EmptyState
              className="h-fit p-6 md:h-full"
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
