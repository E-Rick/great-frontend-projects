import { useProduct, useUpdateURL } from "@/components/product/product-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  useProductColors,
  useProductInventoryByColor,
} from "@/hooks/use-product-query";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";
import { RiCheckFill } from "react-icons/ri";

type ColorSelectorProps = {
  productId: string;
  selectedSize: string | null;
  selectedColor: string | null;
};

export function ColorSelector({
  productId,
  selectedColor,
  selectedSize,
}: ColorSelectorProps) {
  const colors = useProductColors(productId) as string[];

  if (colors === null || colors === undefined) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      <Label>Available Colors</Label>

      <div className="flex w-full flex-wrap gap-4">
        {colors.map((color) => {
          return (
            <div key={color} className="h-[56.67px] p-[9.33px]">
              <Selector
                key={color}
                color={color}
                isActive={color === selectedColor}
                productId={productId}
                selectedSize={selectedSize}
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
  color: string;
  selectedSize: string | null;
};

function Selector({ isActive, color, productId, selectedSize }: SelectorProps) {
  const colorInventory = useProductInventoryByColor(productId, color);
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();

  const colorVariants = {
    beige: "bg-beige-500",
    black: "bg-black",
    orange: "bg-orange-600",
    pink: "bg-pink-500",
    yellow: "bg-yellow-500",
    green: "bg-emerald-500",
    white: "bg-white drop-shadow",
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
    <form>
      <Button
        variant="ghost"
        className={cn(
          `h-[38px] w-[38px] rounded-full p-0 hover:border-[2.33px] hover:border-indigo-200 focus-visible:ring-[9.33px] ${colorVariants[color]}`,
          isActive && "ring-1 ring-brand",
          isActive && !isWhite && "border-[2.33px] border-white",
        )}
        formAction={() => {
          const newState = updateOption("color", color);
          updateURL(newState);
        }}
      >
        <Link
          href={`?${new URLSearchParams({
            ...state,
            color,
            size: selectedSize as string,
          })}`}
          scroll={false}
          replace
        >
          {isColorOutOfStock ? (
            <LineSVG />
          ) : isActive ? (
            <RiCheckFill size={28} className="text-primary-invert" />
          ) : null}
        </Link>
      </Button>
    </form>
  );
}

function LineSVG() {
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
