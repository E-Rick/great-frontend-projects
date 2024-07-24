"use client";
import useProductContext from "@/app/product/[id]/product-context";
import { ColorSelector } from "@/app/product/[id]/ui/color-selector";
import { Price, PriceProps } from "@/app/product/[id]/ui/price";
import { ReviewRating } from "@/app/product/[id]/ui/review-rating";
import { SizeSelector } from "@/app/product/[id]/ui/size-selector";
import { Button } from "@/components/ui/button";
import { CartControl } from "@/components/ui/cart-control";
import { Label } from "@/components/ui/label";
import {
  useProductInventory,
  useProductQuery,
} from "@/hooks/use-product-query";
import { useParams } from "next/navigation";
import { useProductInventoryByColorAndSize } from "../../../hooks/use-product-query";

export default function ProductDetailsSection() {
  const { id: productId } = useParams() as { id: string };

  const { activeSize, activeColor } = useProductContext();
  const { data } = useProductQuery(productId);
  const inventory = useProductInventoryByColorAndSize(
    productId,
    activeColor,
    activeSize,
  );

  const isActiveItemOutOfStock = inventory?.stock === 0;

  if (!data) return null;

  return (
    <div className="flex flex-col w-full max-w-screen-xl gap-12 px-4 pt-16 mx-auto lg:flex-row lg:gap-8 lg:px-8 lg:pt-24">
      <div className="">
        <div className="h-[400px] w-full rounded-lg outline outline-primary lg:h-[800px] lg:w-[592px]">
          {/* <Image src={data.images[0].image_url} alt="" /> */}
        </div>
        <div></div>
      </div>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-semibold text-primary lg:text-5xl">
            {data.name}
          </h2>

          <div className="flex flex-col gap-3">
            <ProductMeta productId={productId} />
            <ReviewRating reviewCount={data.reviews} rating={data.rating} />
          </div>
        </div>
        <p className="text-secondary">{data.description}</p>
        <div className="flex flex-col w-full gap-8">
          {/* Colors Selection */}
          <ColorSelector productId={productId} />
          {/* Sizes Selection */}
          <SizeSelector productId={productId} />
          {/* Quantity controls */}
          <div className="flex flex-col gap-4">
            <Label>Quantity</Label>
            <CartControl productId={productId} />
          </div>
          {isActiveItemOutOfStock && (
            <p className="text-xl font-semibold text-primary">
              Sorry, this item is out of stock
            </p>
          )}
        </div>
        <Button size="xl">Add to Cart</Button>
      </div>
    </div>
  );
}

function ProductMeta({ productId }: { productId: string }) {
  const { activeColor, activeSize } = useProductContext();
  const inventory = useProductInventory(productId, activeColor, activeSize);
  if (!inventory) return null;

  const productMeta: PriceProps = {
    listPrice: inventory["list_price"],
    discount: inventory["discount"],
    discountPercentage: inventory["discount_percentage"],
    salePrice: inventory["sale_price"],
  };

  return (
    <div className="flex flex-col gap-3">
      <Price {...productMeta} />
    </div>
  );
}
