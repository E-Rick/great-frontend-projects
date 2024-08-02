import { ProductReview } from "@/lib/product-review-types";
import { isNotNullish } from "@/lib/typeguards";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import axios from 'axios';

export const defaultQueryParams = { pageSize: 12, page: 1 }

const PRODUCTS_BASE_URL = 'https://www.greatfrontend.com/api/projects/challenges/e-commerce/products'

export const fetchProductReviewsById = async ({
  queryKey,
  pageParam
}): Promise<ProductReview> => {
  const productId = queryKey[1];
  const pageSize = queryKey[2] ?? defaultQueryParams.pageSize
  const rating = queryKey[3]
  const url = new URL(`${PRODUCTS_BASE_URL}/${productId}/reviews`)

  url.searchParams.append("per_page", pageSize)

  if (isNotNullish(pageParam)) {
    url.searchParams.append("page", pageParam)
  }

  if (isNotNullish(rating)) {
    url.searchParams.append('rating', rating)
  }

  const { data } = await axios.get(url.toString());
  return data;
};

export const useProductReviewsQuery = <TData = InfiniteData<ProductReview>>(
  productId: string,
  pageSize: number,
  rating?: string,
  select?: (data: InfiniteData<ProductReview>) => TData,
) =>
  useInfiniteQuery({
    queryKey: ["reviews", productId, pageSize, rating],
    queryFn: fetchProductReviewsById,
    initialPageParam: defaultQueryParams.page,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage.pagination.has_more) {
        return undefined
      }
      return lastPage.pagination.page + 1
    },
    select
  });

/**
 * Selects the review count for a filtered product review.
 * @param productId - string
 * @param rating - string | undefined
 * @returns { filteredReviewCount } Returns the review count for a filtered product review. Default to aggregate's total review count if `rating` param is null.
 */
export const useFilteredProductReviewCount = <TData = InfiniteData<ProductReview>>(
  productId: string,
  pageSize: number,
  rating?: string,
) => {
  return useProductReviewsQuery(productId, pageSize, rating, (data) => {
    let countIndex = rating === undefined ? -1 : parseInt(rating) - 1
    let filteredReviewCount = data.pages[0]?.aggregate.counts[countIndex]?.count
    // If count index is -1 then the rating passed in was undefined, so use total review count
    if (countIndex === -1) {
      filteredReviewCount = data.pages[0]?.aggregate.total
    }
    return {
      filteredReviewCount: filteredReviewCount !== undefined ? filteredReviewCount : 0
    }
    // return the data and check for undefined
  }).data ?? { filteredReviewCount: 0 }
}