import useProductContext from "@/app/product/[id]/product-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  useProductData,
  useProductInventoryByColorAndSize,
} from "@/hooks/use-product-query";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const useProductSizes = (productId: string) =>
  useProductData(productId, (data) => data.sizes);

export function SizeSelector({ productId }: { productId: string }) {
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
      <ul className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <li key={size}>
            <Selector
              isActive={size === activeSize}
              size={size}
              onClick={handleSelectorClick}
              productId={productId}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

type SelectorProps = {
  isActive: boolean;
  onClick: (size: string) => void;
  size: string;
  productId: string;
};

function Selector({ isActive, onClick, size, productId }: SelectorProps) {
  const { activeColor } = useProductContext();
  const inventory = useProductInventoryByColorAndSize(
    productId,
    activeColor,
    size,
  );
  if (inventory === undefined) return null;
  const isOutOfStock = inventory.stock === 0;
  return (
    <Button
      variant="outline"
      size="xl"
      className={cn(
        "w-16 uppercase disabled:text-disabled",
        isActive && "ring-1 ring-brand",
        isOutOfStock && "border-none bg-neutral-100 text-disabled",
      )}
      onClick={() => onClick(size)}
      disabled={isOutOfStock}
    >
      {convertSize(size)}
    </Button>
  );
}

function convertSize(size: string) {
  return size === "sm" ? "s" : size === "md" ? "m" : size === "lg" ? "l" : size;
}
