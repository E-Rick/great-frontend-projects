import { Badge } from "@/components/ui/badge";
import { useProductInventory } from "@/hooks/use-product-query";

type PriceTagProps = {
  productId: string;
  selectedColor?: string | null;
  selectedSize?: string | null;
};

export function PriceTag({
  productId,
  selectedColor,
  selectedSize,
}: PriceTagProps) {
  const inventory = useProductInventory(productId, selectedColor, selectedSize);

  if (!inventory) return null;

  const productMeta: PriceProps = {
    listPrice: inventory["list_price"],
    discount: inventory["discount"],
    discountPercentage: inventory["discount_percentage"],
    salePrice: inventory["sale_price"],
  };

  return (
    <div className="flex flex-col gap-3">
      <Price {...productMeta} />
    </div>
  );
}

type PriceProps = {
  listPrice: number;
  discount: number | null;
  discountPercentage: number | null;
  salePrice: number;
};

function Price({
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
          ${salePrice}
        </span>
        {hasActiveSalePrice && (
          <span className="text-lg font-medium text-neutral-400 line-through">
            ${listPrice}
          </span>
        )}
      </div>
      {hasDiscountPercentage ? (
        <Badge variant="warning">{discountPercentage}% OFF</Badge>
      ) : hasDiscount ? (
        <Badge variant="success">${discount} OFF</Badge>
      ) : null}
    </div>
  );
}
