"use client";
import { useProduct, useUpdateURL } from "@/components/product/product-context";
import ScrollableContainer from "@/components/product/scrollable-container";
import { BlurImage } from "@/components/ui/blur-image";
import { useProductImagesByColor } from "@/hooks/use-product-query";
import { cn, wrap } from "@/lib/utils";
import Image from "next/image";

export function ImageGallery({
  productId,
  selectedColor,
}: {
  productId: string;
  selectedColor: string | null;
}) {
  const images = useProductImagesByColor(productId, selectedColor);
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col gap-2 lg:w-[592px]">
        <div className="h-[400px] w-full overflow-hidden rounded-lg outline-primary lg:h-[800px] lg:w-[592px]">
          <div className="flex h-full w-full items-center justify-center bg-neutral-200">
            <span className="text-neutral-500">No images available</span>
          </div>
        </div>
      </div>
    );
  }

  // Validation to ensure that the index from url always results in a valid image index.
  const imageIndex = state.image
    ? wrap(0, images.length, parseInt(state.image))
    : 0;

  const mainImageUrl = images[imageIndex]?.image_url;

  return (
    <form>
      <div className="flex flex-col gap-2">
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg outline-primary md:h-[800px] lg:w-[592px]">
          {mainImageUrl && (
            <BlurImage
              src={mainImageUrl}
              alt={`Product image ${imageIndex + 1}`}
              className="h-full w-full object-contain"
              priority
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
            />
          )}
        </div>
        <ScrollableContainer className="no-scrollbar lg:max-w-[592px]">
          {images.length > 1 &&
            images.map((image, index) => {
              const isActive = imageIndex === index;
              const isTwoImages = images.length === 2;
              const isThreeImages = images.length === 3;

              return (
                <div
                  key={image.image_url}
                  className={cn(
                    "relative h-[120px] flex-auto shrink-0 md:h-[190px]",
                    isTwoImages
                      ? "w-[calc(50%_-_8px)]"
                      : isThreeImages
                        ? "w-[calc(100%_-_2_*_16px)_/_3)]"
                        : "w-[80px] md:w-[188px] lg:w-[160px]",
                  )}
                >
                  <button
                    role="option"
                    formAction={() => {
                      const newState = updateImage(index.toString());
                      updateURL(newState);
                    }}
                    aria-selected={isActive}
                    aria-label="Select product image"
                    className="h-full w-full"
                  >
                    <div
                      className={cn(
                        "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white",
                      )}
                    >
                      <Image
                        src={image.image_url}
                        alt={`Thumbnail ${index + 1}`}
                        width={288}
                        height={190}
                        className="relative h-full w-full object-cover"
                      />
                    </div>
                    {isActive && (
                      <div
                        role="presentation"
                        className="absolute inset-0 rounded-lg border-4 border-indigo-500 transition-all"
                      />
                    )}
                  </button>
                </div>
              );
            })}
        </ScrollableContainer>
      </div>
    </form>
  );
}
