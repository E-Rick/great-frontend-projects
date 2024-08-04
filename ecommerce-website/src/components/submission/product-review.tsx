"use client";

import { EmptyState } from "@/components/empty-state";
import { useProduct, useUpdateURL } from "@/components/product/product-context";
import { hasData } from "@/components/review/helpers";
import { RatingValues } from "@/components/review/rating-values";
import { ReviewList } from "@/components/review/review-list";
import { ReviewSkeleton } from "@/components/review/review-skeleton";
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
import { useParams } from "next/navigation";
import { RiChatSmile3Line } from "react-icons/ri";

export default function ProductReview() {
  const { id: productId } = useParams() as { id: string };
  const { state, removeOption } = useProduct();
  const { pageSize } = useReviewPageSize();
  const updateURL = useUpdateURL();

  const defaultFilter = undefined;
  const ratingFilter = state.filterByRating ?? defaultFilter;
  const hasFilterParam = state.filterByRating !== undefined;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useProductReviewsQuery(productId, pageSize, ratingFilter);

  const aggregate = data?.pages[0]?.aggregate;
  const rating = aggregate?.rating ?? 0;
  const reviewCount = aggregate?.total ?? 0;

  const { filteredReviewCount } = useFilteredProductReviewCount(
    productId,
    pageSize,
    ratingFilter,
  );

  const hasReviews = rating > 0;
  const filterHasReviews = filteredReviewCount > 0;
  const dataExists = hasData(data);
  const roundedRating = Math.round(rating * 10) / 10;
  const isPending = status === "pending";

  if (!data) return null;

  return (
    <Dialog defaultOpen>
      <div className="opacity-0">
        <div className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
          <span className="text-xl font-medium text-primary">
            {roundedRating}
          </span>
          <StarRating rating={roundedRating} />
          {hasReviews ? (
            <DialogTrigger asChild>
              <Button variant="link-color" size="md">
                See all {reviewCount} reviews
              </Button>
            </DialogTrigger>
          ) : (
            <div className="inline-flex gap-0.5 py-1 text-center">
              <span className="text-sm">No Reviews Yet.</span>
              <DialogTrigger asChild>
                <Button variant="link-color" size="md">
                  Be the first.
                </Button>
              </DialogTrigger>
            </div>
          )}
        </div>
      </div>

      <DialogContent
        // prevent auto focus for better submission score
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="flex h-[calc(100%_-160px)] w-full max-w-[calc(100%_-_32px)] flex-col gap-8 overflow-hidden overflow-y-auto rounded-lg px-0 pt-[72px] focus-visible:outline-none focus-visible:ring-0 md:max-w-[calc(100%_-_246px)] md:pb-0 lg:h-[calc(100%_-160px)] lg:max-w-[1008px] lg:flex-row"
      >
        <div className="left-container flex h-fit flex-col gap-6 px-3 md:px-8 lg:w-[384px] lg:max-w-[384px]">
          <div className="heading flex flex-col gap-2">
            <DialogTitle>Overall Rating</DialogTitle>
            <DialogDescription className="flex w-full flex-wrap items-center gap-2">
              <span className="text-base font-semibold text-primary">
                {roundedRating}
              </span>
              <StarRating rating={roundedRating} className="gap-2" />
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
              <form className="w-full">
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

            <Button
              size="xl"
              variant="secondary"
              className={cn(!hasFilterParam && !filterHasReviews && "w-full")}
            >
              Write a review
            </Button>
          </div>
        </div>

        <div className="right-container flex flex-auto lg:w-[592px] lg:flex-none">
          {isPending ? (
            <ReviewSkeleton />
          ) : dataExists && hasReviews && filterHasReviews ? (
            <div className="scrollbox flex h-full flex-col gap-6 overflow-auto px-4 md:gap-8 md:px-8 lg:pl-0 lg:pr-8">
              {data?.pages.map((page) => (
                <ReviewList key={page.pagination.page} data={page.data} />
              ))}

              {hasNextPage && (
                <DialogFooter className="py-6">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                    aria-disabled={!hasNextPage || isFetchingNextPage}
                  >
                    {isFetchingNextPage
                      ? "Loading more..."
                      : `Show ${pageSize} more reviews`}
                  </Button>
                </DialogFooter>
              )}
            </div>
          ) : (
            <EmptyState
              className="h-fit p-6 md:h-full lg:p-0 lg:pr-6"
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
