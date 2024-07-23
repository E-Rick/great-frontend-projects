import { ProductDetail } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

export const fetchProductById = async ({
  queryKey,
}): Promise<ProductDetail> => {
  const productId = queryKey[1];
  const { data } = await axios.get(
    `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}`,
  );
  return data;
};


export const useProductQuery = <TData = ProductDetail,>(
  productId: string,
  select?: (data: ProductDetail) => TData,
) =>
  useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProductById,
    select,
  });


export const useProductData = <TData = ProductDetail,>(
  productId: string,
  select?: (data: ProductDetail) => TData,
) => {
  return useProductQuery(productId, select).data
}