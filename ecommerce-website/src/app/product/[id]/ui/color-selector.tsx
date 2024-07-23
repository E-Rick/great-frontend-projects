import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useProductData } from "@/hooks/use-product-query";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { RiCheckFill } from "react-icons/ri";

const useProductColors = (productId: string) =>
  useProductData(productId, (data) => data.colors);

export function ColorSelector({ productId }: { productId: string }) {
  const colors = useProductColors(productId);
  const isColorNullOrUndefined = colors === null || colors === undefined;

  const [activeColor, setActiveColor] = useState(
    isColorNullOrUndefined ? null : colors[0],
  );

  if (isColorNullOrUndefined) return null;

  const handleSelectorClick = (color: string) => {
    setActiveColor(color);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Label>Available Colors</Label>

      <div className="flex w-full flex-wrap gap-4">
        {colors.map((color) => (
          <div key={color} className="p-[9.33px]">
            <Selector
              key={color}
              color={color}
              isActive={color === activeColor}
              onClick={handleSelectorClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

type SelectorProps = {
  isActive: boolean;
  onClick: (color: string) => void;
  color: string;
};

function Selector({ isActive, onClick, color }: SelectorProps) {
  const colorVariants = {
    beige: "bg-beige-500",
    black: "bg-black",
    orange: "bg-orange-500",
    pink: "bg-pink-500",
    yellow: "bg-yellow-500",
    green: "bg-emerald-500",
    white: "bg-white",
    brown: "bg-brown-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        `h-[38px] w-[38px] rounded-full p-0 ${colorVariants[color]}`,
        isActive && "border-[2.33px] border-white ring-1 ring-brand",
      )}
      onClick={() => onClick(color)}
    >
      {isActive ? (
        <RiCheckFill size={28} className="text-primary-invert" />
      ) : null}
    </Button>
  );
}
