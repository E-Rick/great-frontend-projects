import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center gap-[6px] justify-center whitespace-nowrap",
    "rounded-md text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-nav-item/15 ",
    "disabled:pointer-events-none disabled:text-disabled",
  ],
  {
    variants: {
      variant: {
        default: "bg-brand text-primary-invert shadow hover:bg-brand/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-white shadow-sm hover:bg-neutral-50  hover:text-primary-hover focus-visible:ring-brand focus-visible:bg-neutral-50",
        secondary:
          "bg-white text-primary shadow-sm border-[.5px] hove border-neutral-200 hover:text-primary-hover hover:bg-neutral-50 hover:border-1 disabled:border-none focus- disabled:bg-neutral-100",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-brand hover:text-indigo-800",
        "link-gray":
          "text-secondary hover:text-primary focus-visible:ring-nav-item/15 ",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-fit rounded-[4px] text-sm px-0.5",
        lg: "h-11 rounded-[4px] px-8",
        xl: "h-12 rounded-[4px] px-5",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    compoundVariants: [
      {
        variant: "link",
        size: "lg",
        class: "px-0.5 h-fit",
      },
      {
        variant: "link",
        size: "md",
        class: "",
      },
    ],
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
