import { ProductReview } from "@/lib/product-review-types";
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from 'axios';

export const fetchProductReviewsById = async ({
  queryKey,
  pageParam
}): Promise<ProductReview> => {
  const productId = queryKey[1];
  const rating = queryKey[2]
  const url = new URL(`https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}/reviews`)
  if (rating !== undefined) {
    url.searchParams.append('rating', rating)
  }
  const { data } = await axios.get(url.toString());
  return data;
};

export const useProductReviewsQuery = <TData = InfiniteData<ProductReview>>(
  productId: string,
  rating?: string | null,
  select?: (data: InfiniteData<ProductReview>) => TData,
) =>
  useInfiniteQuery({
    queryKey: ["reviews", productId, rating],
    queryFn: fetchProductReviewsById,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage.pagination.has_more) {
        return undefined
      }
      return lastPageParam + 1
    },
    select
  });

/**
 * Selects the review count for a filtered product review.
 * @param productId - string
 * @param rating - string | null
 * @returns { filteredReviewCount } Returns the review count for a filtered product review. Default to aggregate's total review count if `rating` param is null.
 */
export const useFilteredProductReviewCount = <TData = InfiniteData<ProductReview>>(
  productId: string,
  rating?: string | null
) => {
  return useProductReviewsQuery(productId, rating, (data) => {
    let countIndex = Number(rating) - 1 // Number() converts null to 0
    let filteredReviewCount = data.pages[0]?.aggregate.counts[countIndex]?.count
    // If count index is -1 then the rating passed in was null, so use total review count
    if (countIndex === -1) {
      filteredReviewCount = data.pages[0]?.aggregate.total
    }
    return {
      filteredReviewCount: filteredReviewCount !== undefined ? filteredReviewCount : 0
    }
  }).data ?? { filteredReviewCount: 0 }
}