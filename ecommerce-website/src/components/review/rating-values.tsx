import { useProduct, useUpdateURL } from "@/components/product/product-context";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProductReviewsQuery } from "@/hooks/use-product-reviews";
import { useReviewPageSize } from "@/hooks/use-review-page-size";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

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

export function RatingValues({ productId }: { productId: string }) {
  return (
    <div className="flex w-full flex-col gap-4 py-4">
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
  const { pageSize } = useReviewPageSize();
  const { data } = useProductReviewsQuery(
    productId,
    pageSize,
    rating.toString(),
  );

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
        disabled={total === 0}
        aria-disabled={total === 0}
        className={cn(
          "min-w-[120px] justify-start",
          isActive && "text-brand hover:text-indigo-800",
        )}
        formAction={() => {
          const newState = updateOption("filterByRating", rating.toString());
          updateURL(newState);
        }}
      >
        {label}
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
