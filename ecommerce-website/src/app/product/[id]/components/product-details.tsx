"use client";
import { ColorSelector } from "@/app/product/[id]/ui/color-selector";
import { ImageGallery } from "@/app/product/[id]/ui/image-gallery";
import { PriceTag } from "@/app/product/[id]/ui/price-tag";
import { ProductInfoList } from "@/app/product/[id]/ui/product-info-list";
import { ReviewRating } from "@/app/product/[id]/ui/review-rating";
import { SizeSelectors } from "@/app/product/[id]/ui/size-selectors";
import { Button } from "@/components/ui/button";
import { CartControl } from "@/components/ui/cart-control";
import { Label } from "@/components/ui/label";
import {
  useProductInventoryByColorAndSize,
  useProductQuery,
} from "@/hooks/use-product-query";
import { useParams, useSearchParams } from "next/navigation";

export default function ProductDetailsSection() {
  const { id: productId } = useParams() as { id: string };
  const { data } = useProductQuery(productId);
  const searchParams = useSearchParams();

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
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-12 px-4 py-16 lg:flex-row lg:gap-8 lg:px-8 lg:pt-24">
      <ImageGallery productId={productId} selectedColor={selectedColor} />
      <div className="flex flex-col gap-10">
        <div className="flex w-full flex-col gap-8">
          <div className="product-header flex flex-col gap-5">
            <h2 className="text-3xl font-semibold text-primary lg:text-5xl">
              {data.name}
            </h2>

            <div className="flex flex-col gap-3">
              <PriceTag
                productId={productId}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
              />
              <ReviewRating reviewCount={data.reviews} rating={data.rating} />
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
            <div className="flex flex-col gap-4">
              <Label>Quantity</Label>
              <CartControl
                productId={productId}
                color={selectedColor}
                size={selectedSize}
              />
            </div>
            {isSelectedItemOutOfStock && (
              <p className="text-xl font-semibold text-primary">
                Sorry, this item is out of stock
              </p>
            )}
          </div>
          <Button
            size="xl"
            variant={isSelectedItemOutOfStock ? "secondary" : "default"}
            disabled={isSelectedItemOutOfStock}
          >
            Add to Cart
          </Button>
        </div>
        <ProductInfoList productId={productId} />
      </div>
    </div>
  );
}
