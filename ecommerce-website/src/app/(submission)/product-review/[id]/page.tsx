import ProductReview from "@/components/submission/product-review";
import {
  defaultQueryParams,
  fetchProductReviewsById,
} from "@/hooks/use-product-reviews";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function ProductPage({ params }) {
  const { id: productId } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["reviews", productId, defaultQueryParams.pageSize, null],
    queryFn: fetchProductReviewsById,
    initialPageParam: defaultQueryParams.page,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage.pagination.has_more) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductReview />
      </HydrationBoundary>
    </>
  );
}
