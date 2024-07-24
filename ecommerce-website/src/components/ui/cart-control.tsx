import useProductContext from "@/app/product/[id]/product-context";
import { Button } from "@/components/ui/button";
import { useProductInventoryByColorAndSize } from "@/hooks/use-product-query";
import { useEffect, useRef } from "react";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";

type CartControlProps = {
  productId: string;
};

export const CartControl = ({ productId }: CartControlProps) => {
  const { activeSize, activeColor, quantity, setQuantity } =
    useProductContext();
  const inventory = useProductInventoryByColorAndSize(
    productId,
    activeColor,
    activeSize,
  );
  const isOutOfStock = inventory?.stock === 0;

  useEffect(() => {
    if (isOutOfStock) setQuantity(0);
    else setQuantity(1);
  }, [isOutOfStock, setQuantity]);

  const incrementIntervalRef = useRef<number | null>(null);
  const decrementIntervalRef = useRef<number | null>(null);

  const handleDecrementClick = () =>
    setQuantity((prev) => (prev >= 2 ? prev - 1 : 1));

  const handleIncrementClick = () =>
    setQuantity((prev) => (prev === inventory?.stock ? prev : prev + 1));

  const startIncrement = () => {
    handleIncrementClick();
    incrementIntervalRef.current = window.setInterval(
      handleIncrementClick,
      100,
    );
  };

  const startDecrement = () => {
    handleDecrementClick();
    decrementIntervalRef.current = window.setInterval(
      handleDecrementClick,
      100,
    );
  };

  const stopIncrement = () => {
    if (incrementIntervalRef.current) {
      clearInterval(incrementIntervalRef.current);
    }
  };

  const stopDecrement = () => {
    if (decrementIntervalRef.current) {
      clearInterval(decrementIntervalRef.current);
    }
  };

  return (
    <div className="flex h-auto w-[125px] gap-3 rounded-md border border-neutral-200 bg-neutral-50 p-[2px]">
      <Button
        variant="ghost"
        size="icon"
        onMouseDown={startDecrement}
        onMouseUp={stopDecrement}
        onMouseLeave={stopDecrement}
        onTouchStart={startDecrement}
        onTouchEnd={stopDecrement}
        disabled={quantity === 1 || isOutOfStock}
        tabIndex={-1}
      >
        <RiSubtractFill />
      </Button>
      <span className="m-auto flex w-[49px] items-center justify-center text-sm font-medium">
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onMouseDown={startIncrement}
        onMouseUp={stopIncrement}
        onMouseLeave={stopIncrement}
        onTouchStart={startIncrement}
        onTouchEnd={stopIncrement}
        disabled={quantity === inventory?.stock || isOutOfStock}
        tabIndex={-1}
      >
        <RiAddFill />
      </Button>
    </div>
  );
};
