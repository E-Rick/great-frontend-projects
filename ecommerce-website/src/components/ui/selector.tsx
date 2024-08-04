import { cva, type VariantProps } from "cva";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const selectorVariants = cva({
  base: [
    "inline-flex items-center gap-[6px] justify-center whitespace-nowrap uppercase",
    "rounded-[4px] text-base font-medium transition-colors",
    "disabled:pointer-events-none disabled:text-disabled",
    "outline-1 outline outline-neutral-200",
  ],
  variants: {
    variant: {
      default:
        " bg-white hover:bg-neutral-50  hover:text-primary-hover  focus-visible:bg-neutral-50",
    },
    size: {
      xl: "w-16 px-5 py-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "xl",
  },
});

export interface SelectorProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof selectorVariants> {
  asChild?: boolean;
}

const Selector = React.forwardRef<HTMLButtonElement, SelectorProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(selectorVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Selector.displayName = "Selector";

export { Selector, selectorVariants };
