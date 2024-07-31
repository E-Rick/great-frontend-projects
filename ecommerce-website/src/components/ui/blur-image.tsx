import cx from "clsx";
import type { ImageProps } from "next/image";
import NextImage from "next/image";
import React from "react";

export const BlurImage = (props: ImageProps) => {
  const [isLoading, setLoading] = React.useState(true);

  return (
    <div
      className={cx(
        "after:border-neutral-50-200/10 relative flex h-full justify-center overflow-hidden rounded-xl bg-white/[2%] after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-xl after:border after:content-['']",
        isLoading ? "animate-pulse" : "",
      )}
    >
      <NextImage
        {...props}
        className={cx(
          "rounded-xl duration-700 ease-in-out",
          isLoading
            ? "scale-[1.02] blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0",
        )}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
