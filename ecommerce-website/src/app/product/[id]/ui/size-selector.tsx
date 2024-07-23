import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useProductData } from "@/hooks/use-product-query";
import { cn } from "@/lib/utils";
import { useState } from "react";

const useProductSizes = (productId: string) =>
  useProductData(productId, (data) => data.sizes);

export function SizeSelector({ productId }: { productId: string }) {
  const sizes = useProductSizes(productId);
  const isSizeNullOrUndefined = sizes === null || sizes === undefined;

  const [activeSize, setActiveSize] = useState(
    isSizeNullOrUndefined ? null : sizes[0],
  );

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
};

function Selector({ isActive, onClick, size }: SelectorProps) {
  return (
    <Button
      variant="outline"
      size="xl"
      className={cn("w-16 uppercase", isActive && "ring-1 ring-brand")}
      onClick={() => onClick(size)}
    >
      {convertSize(size)}
    </Button>
  );
}

function convertSize(size: string) {
  return size === "sm" ? "s" : size === "md" ? "m" : size === "lg" ? "l" : size;
}
