import { Badge } from "@/components/ui/badge";

export type PriceProps = {
  listPrice: number;
  discount: number | null;
  discountPercentage: number | null;
  salePrice: number;
};

export function Price({
  listPrice,
  discount,
  discountPercentage,
  salePrice,
}: PriceProps) {
  const hasDiscountPercentage = discountPercentage !== null;
  const hasDiscount = discount !== null;
  const hasActiveSalePrice = salePrice !== listPrice;

  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex items-baseline gap-2">
        <span className="text-3xl font-medium text-neutral-600">
          {salePrice}
        </span>
        {hasActiveSalePrice && (
          <span className="text-lg font-medium line-through text-neutral-400">
            ${listPrice}
          </span>
        )}
      </div>
      {hasDiscountPercentage ? (
        <Badge variant="warning">{discountPercentage}% OFF</Badge>
      ) : hasDiscount ? (
        <Badge variant="warning">${} OFF</Badge>
      ) : null}
    </div>
  );
}
