import { ProductReview } from "@/lib/product-review-types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

export const useProductReviewsQuery = <TData = ProductReview>(
  productId: string,
  rating?: string
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
  });

export const useProductReviewData = <TData = ProductReview,>(
  productId: string,
) => {
  return useProductReviewsQuery(productId).data
}