import { ProductReview } from "@/lib/product-review-types";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';


export const fetchProductReviewsById = async ({
  queryKey,
}): Promise<ProductReview> => {
  const productId = queryKey[1];
  const { data } = await axios.get(
    `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}/reviews`,
  );
  return data;
};

export const useProductReviewsQuery = <TData = ProductReview>(
  productId: string,
  select?: (data: ProductReview) => TData,
) =>
  useQuery({
    queryKey: ["review", productId],
    queryFn: fetchProductReviewsById,
    select,
  });

export const useProductReviewData = <TData = ProductReview,>(
  productId: string,
  select?: (data: ProductReview) => TData,
) => {
  return useProductReviewsQuery(productId, select).data
}