import useProductContext from "@/app/product/[id]/product-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useProductData } from "@/hooks/use-product-query";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { RiCheckFill } from "react-icons/ri";
import { useProductInventoryByColor } from "../../../../hooks/use-product-query";

const useProductColors = (productId: string) =>
  useProductData(productId, (data) => data.colors);

export function ColorSelector({ productId }: { productId: string }) {
  const colors = useProductColors(productId);
  const isColorNullOrUndefined = colors === null || colors === undefined;
  const { activeColor, setActiveColor } = useProductContext();

  useEffect(() => {
    if (colors !== null && colors !== undefined) setActiveColor(colors[0]);
  }, [colors, setActiveColor]);

  if (isColorNullOrUndefined) return null;

  const handleSelectorClick = (color: string) => {
    setActiveColor(color);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <Label>Available Colors</Label>

      <div className="flex flex-wrap w-full gap-4">
        {colors.map((color) => {
          // Check the stock for that color

          return (
            <div key={color} className="p-[9.33px]">
              <Selector
                key={color}
                color={color}
                isActive={color === activeColor}
                onClick={handleSelectorClick}
                productId={productId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

type SelectorProps = {
  productId: string;
  isActive: boolean;
  onClick: (color: string) => void;
  color: string;
};

function Selector({ isActive, onClick, color, productId }: SelectorProps) {
  const colorInventory = useProductInventoryByColor(productId, color);

  const colorVariants = {
    beige: "bg-beige-500",
    black: "bg-black",
    orange: "bg-orange-500",
    pink: "bg-pink-500",
    yellow: "bg-yellow-500",
    green: "bg-emerald-500",
    white: "bg-white border-black border-[1px]",
    brown: "bg-brown-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
  };

  const isWhite = color === "white";

  const isColorOutOfStock = useMemo(
    () => colorInventory?.every((item) => item.stock === 0),
    [colorInventory],
  );

  return (
    <Button
      variant="ghost"
      className={cn(
        `h-[38px] w-[38px] rounded-full p-0 ${colorVariants[color]}`,
        isActive && "ring-1 ring-brand",
        isActive && !isWhite && "border-[2.33px] border-white",
      )}
      onClick={() => onClick(color)}
    >
      {isColorOutOfStock ? (
        <Line />
      ) : isActive ? (
        <RiCheckFill size={28} className="text-primary-invert" />
      ) : null}
    </Button>
  );
}

function Line() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      fill="none"
      viewBox="0 0 34 34"
    >
      <path
        fill="#525252"
        d="M32.4 0.2H34.5V45H32.4z"
        transform="rotate(45 32.4 .2)"
      ></path>
    </svg>
  );
}
