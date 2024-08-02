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

// Returns the review count for a filtered product review
export const useFilteredProductReviewCount = <TData = InfiniteData<ProductReview>>(
  productId: string,
  rating?: string | null
) => {
  return useProductReviewsQuery(productId, rating, (data) => {
    const filteredReviewCount = data.pages[0]?.aggregate.counts[Number(rating) - 1]?.count
    return {
      filteredReviewCount: filteredReviewCount !== undefined ? filteredReviewCount : 0
    }
  }).data ?? { filteredReviewCount: 0 }
}