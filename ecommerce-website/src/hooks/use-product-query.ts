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

export const useProductReviewCount = (productId: string) =>
  useProductData(productId, (data) => data.reviews);
export const useProductRating = (productId: string) =>
  useProductData(productId, (data) => data.rating);



export const useProductInventory = (
  productId: string,
  color?: string | null,
  size?: string | number | null,
) =>
  useProductData(productId, (data) => {
    if (size === null && color === null) {
      // check if inventory isn't undefined
      if (data.inventory !== undefined)
        return data.inventory[0]
    } else {
      return data.inventory?.find((inventory) => {
        return inventory.color === color && inventory.size === size;
      });
    }
  });

export const useProductInventoryByColor = (
  productId: string,
  color?: string | null,
) =>
  useProductData(productId, (data) => {
    const inventory = data.inventory
    return inventory?.filter(item => item.color === color)
  })

export const useProductInventoryByColorAndSize = (
  productId: string,
  color?: string | null,
  size?: string | number | null
) =>
  useProductData(productId, (data) => {
    const inventory = data.inventory
    return inventory?.find(item => item.color === color && item.size === size)
  })

export const useProductImagesByColor = (
  productId: string,
  color?: string | null
) => useProductData(productId, (data) => {
  const images = data.images
  return images?.filter(image => image.color === color)
})


export const useProductColors = (productId: string) =>
  useProductData(productId, (data) => data.colors);