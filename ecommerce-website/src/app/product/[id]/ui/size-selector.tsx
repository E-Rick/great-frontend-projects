import useProductContext from "@/app/product/[id]/product-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useProductData } from "@/hooks/use-product-query";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const useProductSizes = (productId: string) =>
  useProductData(productId, (data) => data.sizes);

export function SizeSelector({ productId }: { productId: string }) {
  const { activeSize, activeColor, setActiveSize } = useProductContext();
  const sizes = useProductSizes(productId);
  // const sizes = useProductInventory(productId, activeColor, activeSize);
  const isSizeNullOrUndefined = sizes === null || sizes === undefined;

  // const [activeColor, setActiveColor] = useState(
  //   isColorNullOrUndefined ? null : colors[0],
  // );

  useEffect(() => {
    if (sizes !== null && sizes !== undefined) setActiveSize(sizes[0]);
  }, [sizes, setActiveSize]);
  // const [activeSize, setActiveSize] = useState(
  //   isSizeNullOrUndefined ? null : sizes[0],
  // );

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
