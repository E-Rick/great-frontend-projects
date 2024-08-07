"use client";

import { CartControl } from "@/components/cart/cart-control";
import { ColorSelector } from "@/components/product/color-selector";
import { ImageGallery } from "@/components/product/image-gallery";
import { PriceTag } from "@/components/product/price-tag";
import { ProductInfoList } from "@/components/product/product-info-list";
import { SizeSelectors } from "@/components/product/size-selectors";
import { ReviewRating } from "@/components/review/review-rating";
import { Button } from "@/components/ui/button";
import {
  useProductInventoryByColorAndSize,
  useProductQuery,
} from "@/hooks/use-product-query";
import { useParams, useSearchParams } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

export default function ProductDetailsSection() {
  const { id: productId } = useParams() as { id: string };
  const { data } = useProductQuery(productId);
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 425px)");

  const defaultColor = data?.colors?.[0] ?? null;
  const defaultSize = data?.sizes?.[0] ?? null;

  const selectedColor = searchParams.get("color") ?? defaultColor;
  const selectedSize = searchParams.get("size") ?? defaultSize;

  const inventory = useProductInventoryByColorAndSize(
    productId,
    selectedColor,
    selectedSize,
  );

  const isSelectedItemOutOfStock = inventory?.stock === 0;

  if (!data) return null;

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-12 px-4 py-12 md:py-16 lg:flex-row lg:gap-8 lg:px-8 lg:pt-24">
      <ImageGallery productId={productId} selectedColor={selectedColor} />
      <div className="flex flex-col gap-10">
        <div className="flex w-full flex-col gap-8">
          <div className="product-header flex flex-col gap-5">
            <h2 className="text-3xl font-semibold text-primary md:text-5xl">
              {data.name}
            </h2>

            <div className="flex flex-col gap-3">
              <PriceTag
                productId={productId}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
              />
              <ReviewRating
                productId={productId}
                reviewCount={data.reviews}
                rating={data.rating}
              />
            </div>
          </div>
          <p className="product-spiel text-secondary">{data.description}</p>
          <div className="product-options flex w-full flex-col gap-8">
            {/* Colors Selection */}
            <ColorSelector
              productId={productId}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
            />
            {/* Sizes Selection */}
            <SizeSelectors
              productId={productId}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
            />
            {/* Quantity controls */}
            <CartControl
              productId={productId}
              color={selectedColor}
              size={selectedSize}
            />
            {isSelectedItemOutOfStock && (
              <p className="text-xl font-semibold text-primary">
                Sorry, this item is out of stock
              </p>
            )}
          </div>
          <Button
            size={isMobile ? "xl" : "2xl"}
            variant="primary"
            disabled={isSelectedItemOutOfStock}
            aria-disabled={isSelectedItemOutOfStock}
          >
            Add to Cart
          </Button>
        </div>
        <ProductInfoList productId={productId} defaultOpen={true} />
      </div>
    </div>
  );
}
