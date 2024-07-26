import ProductDetails from "@/app/product/[id]/components/product-details";
import { fetchProductById } from "@/hooks/use-product-query";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ProductPage({ params }) {
  const { id: productId } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product", productId],
    queryFn: fetchProductById,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetails />
      </HydrationBoundary>
    </>
  );
}
