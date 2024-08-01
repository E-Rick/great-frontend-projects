import { useProduct, useUpdateURL } from "@/components/product/product-context";
import { Label } from "@/components/ui/label";
import { Selector } from "@/components/ui/selector";
import {
  useProductData,
  useProductInventoryByColorAndSize,
} from "@/hooks/use-product-query";
import { cn } from "@/lib/utils";
import Link from "next/link";

const useProductSizes = (productId: string) =>
  useProductData(productId, (data) => data.sizes);

type SizeSelectorsProps = {
  productId: string;
  selectedSize: string | null;
  selectedColor: string | null;
};

export function SizeSelectors({
  productId,
  selectedSize,
  selectedColor,
}: SizeSelectorsProps) {
  const sizes = useProductSizes(productId) as string[];

  if (sizes === null || sizes === undefined) return null;

  return (
    <div className="flex flex-col gap-4">
      <Label>Available Sizes</Label>
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <SizeSelector
            key={size}
            isActive={size === selectedSize}
            size={size}
            productId={productId}
            selectedColor={selectedColor}
          />
        ))}
      </div>
    </div>
  );
}

type SelectorProps = {
  isActive: boolean;
  size: string;
  productId: string;
  selectedColor: string | null;
};

function SizeSelector({
  isActive,
  size,
  productId,
  selectedColor,
}: SelectorProps) {
  const inventory = useProductInventoryByColorAndSize(
    productId,
    selectedColor,
    size,
  );
  const isOutOfStock = inventory?.stock === 0;
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();

  return (
    <form>
      <Selector
        size="xl"
        className={cn(
          isActive && "ring-1 ring-indigo-600 ring-offset-1",
          isOutOfStock && "bg-neutral-100 outline-0",
        )}
        disabled={isOutOfStock}
        formAction={() => {
          const newState = updateOption("size", size);
          updateURL(newState);
        }}
      >
        <Link
          href={`?${new URLSearchParams({
            ...state,
            color: selectedColor as string,
            size,
          })}`}
          scroll={false}
          replace
          tabIndex={-1}
        >
          <span className="px-0.5">{convertSize(size)}</span>
        </Link>
      </Selector>
    </form>
  );
}

function convertSize(size: string) {
  return size === "sm" ? "s" : size === "md" ? "m" : size === "lg" ? "l" : size;
}
