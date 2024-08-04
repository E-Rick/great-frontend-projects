import { useProduct } from "@/components/product/product-context";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProductInventoryByColorAndSize } from "@/hooks/use-product-query";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { useUpdateURL } from "../product/product-context";

type CartControlProps = {
  productId: string;
  stock?: number;
  color?: string | null;
  size?: string | number | null;
};

export const CartControl = ({ productId, color, size }: CartControlProps) => {
  const { state, updateOption } = useProduct();
  const inventory = useProductInventoryByColorAndSize(productId, color, size);
  const updateURL = useUpdateURL();

  const isOutOfStock = inventory?.stock === 0;
  const hasQuantity = state.quantity !== undefined;
  const hasMaxQuantity =
    hasQuantity && Number(state.quantity) === inventory?.stock;

  return (
    <form className="flex w-[125px] items-center justify-center gap-3 rounded-md bg-neutral-50 p-0.5 outline outline-1 outline-neutral-200">
      <Button
        formAction={() => {
          const prev = Number(state.quantity) ?? 1;
          const newQuantity = prev >= 2 ? prev - 1 : 1;
          const newState = updateOption("quantity", newQuantity.toString());
          updateURL(newState);
        }}
        variant="link-gray"
        size="icon"
        disabled={!hasQuantity || state.quantity === "1" || isOutOfStock}
        aria-disabled={!hasQuantity || state.quantity === "1" || isOutOfStock}
        tabIndex={-1}
      >
        <RiSubtractFill size={20} />
      </Button>
      <span className="w-[49px] gap-2 px-3 py-1.5 text-center text-sm font-medium">
        {state.quantity || 1}
      </span>
      {hasMaxQuantity || isOutOfStock ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                formAction={() => {
                  const prev: string = state.quantity ?? "1";
                  const newQuantity =
                    parseInt(prev) == inventory?.stock
                      ? prev
                      : parseInt(prev) + 1;
                  const newState = updateOption(
                    "quantity",
                    newQuantity.toString(),
                  );
                  updateURL(newState);
                }}
                variant="link-gray"
                size="icon"
                disabled={hasMaxQuantity || isOutOfStock}
                aria-disabled={hasMaxQuantity || isOutOfStock}
                tabIndex={-1}
              >
                <RiAddFill size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Insufficient stock</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Button
          formAction={() => {
            const prev: string = state.quantity ?? "1";
            const newQuantity =
              parseInt(prev) == inventory?.stock ? prev : parseInt(prev) + 1;
            const newState = updateOption("quantity", newQuantity.toString());
            updateURL(newState);
          }}
          variant="link-gray"
          size="icon"
          disabled={hasMaxQuantity || isOutOfStock}
          aria-disabled={hasMaxQuantity || isOutOfStock}
          tabIndex={-1}
        >
          <RiAddFill size={20} />
        </Button>
      )}
    </form>
  );
};
