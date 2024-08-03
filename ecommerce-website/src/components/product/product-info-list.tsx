import { useProductData } from "@/hooks/use-product-query";
import { Accordion } from "./accordion";

const useProductInfo = (productId: string) =>
  useProductData(productId, (data) => data.info);

export function ProductInfoList({
  productId,
  defaultOpen,
}: {
  productId: string;
  defaultOpen?: boolean;
}) {
  const productInfo = useProductInfo(productId);

  if (!productInfo) return null;

  return (
    <div className="flex flex-col">
      {productInfo.map((info, i) => {
        if (!info.description) return null;
        return (
          <Accordion
            key={i}
            title={info.title}
            content={info.description}
            defaultOpen={defaultOpen}
          />
        );
      })}
    </div>
  );
}
