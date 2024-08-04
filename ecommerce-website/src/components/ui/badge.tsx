import { cva, type VariantProps } from "cva";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva({
  base: [
    "inline-flex items-center rounded-full w-fit px-2.5 py-1 text-xs lg:font-normal lg:text-sm font-medium",
    " transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
  ],
  variants: {
    variant: {
      default:
        "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      warning: "ring-1 ring-amber-200 text-amber-700 bg-amber-50",
      success: "ring-1 ring-green-200 text-green-700 bg-green-50",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
