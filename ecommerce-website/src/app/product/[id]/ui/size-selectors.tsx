import useProductContext from "@/app/product/[id]/product-context";
import { Label } from "@/components/ui/label";
import { Selector } from "@/components/ui/selector";
import {
  useProductData,
  useProductInventoryByColorAndSize,
} from "@/hooks/use-product-query";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const useProductSizes = (productId: string) =>
  useProductData(productId, (data) => data.sizes);

export function SizeSelectors({ productId }: { productId: string }) {
  const { activeSize, activeColor, setActiveSize } = useProductContext();
  const sizes = useProductSizes(productId);

  const isSizeNullOrUndefined = sizes === null || sizes === undefined;

  useEffect(() => {
    if (sizes !== null && sizes !== undefined) setActiveSize(sizes[0]);
  }, [sizes, setActiveSize]);

  if (isSizeNullOrUndefined) return null;

  const handleSelectorClick = (size: string) => {
    setActiveSize(size);
  };

  return (
    <div className="flex flex-col gap-4">
      <Label>Available Sizes</Label>
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <SizeSelector
            key={size}
            isActive={size === activeSize}
            size={size}
            onClick={handleSelectorClick}
            productId={productId}
          />
        ))}
      </div>
    </div>
  );
}

type SelectorProps = {
  isActive: boolean;
  onClick: (size: string) => void;
  size: string;
  productId: string;
};

function SizeSelector({ isActive, onClick, size, productId }: SelectorProps) {
  const { activeColor } = useProductContext();
  const inventory = useProductInventoryByColorAndSize(
    productId,
    activeColor,
    size,
  );
  const isOutOfStock = inventory?.stock === 0;

  return (
    <Selector
      size="xl"
      className={cn(
        isActive && "ring-1 ring-indigo-600 ring-offset-1",
        isOutOfStock && "bg-neutral-100 outline-0",
      )}
      onClick={() => onClick(size)}
      disabled={isOutOfStock}
    >
      <span className="px-0.5">{convertSize(size)}</span>
    </Selector>
  );
}

function convertSize(size: string) {
  return size === "sm" ? "s" : size === "md" ? "m" : size === "lg" ? "l" : size;
}
