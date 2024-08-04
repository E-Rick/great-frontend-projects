import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "cva";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva({
  base: [
    "inline-flex items-center gap-1.5 justify-center whitespace-nowrap",
    "rounded-[4px] text-sm font-normal transition-colors",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-nav-item/15 ",
    "disabled:text-disabled disabled:cursor-not-allowed",
  ],
  variants: {
    variant: {
      primary: "bg-brand text-primary-invert shadow hover:bg-indigo-900 focus",
      destructive: "bg-red-600 text-primary-invert shadow-sm hover:bg-red-700",
      outline:
        "border border-input bg-white shadow-sm hover:bg-neutral-50  hover:text-primary-hover  focus-visible:bg-neutral-50",
      secondary:
        "bg-white text-secondary shadow-sm border-[.5px] border-neutral-200 hover:text-primary-hover hover:bg-neutral-50 hover:border-1 disabled:border-none disabled:bg-neutral-100",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      "link-color": "text-brand hover:text-indigo-800 h-fit",
      "link-gray": "text-secondary hover:text-primary h-fit",
      tertiary:
        "bg-white text-brand hover:bg-neutral-50 disabled:bg-neutral-400",
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "px-3 text-xs",
      md: "px-3.5 py-2.5 gap-1 text-sm",
      lg: "px-4 py-2.5",
      xl: "text-base px-5 py-3",
      "2xl": "px-6 py-4 rounded-[4px] gap-2.5",
      icon: "p-0 w-max",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
  compoundVariants: [
    {
      variant: "link-color",
      size: "lg",
      class: "px-0.5 h-fit",
    },
    {
      variant: "link-gray",
      size: "lg",
      class: "px-0.5 h-fit text-base",
    },
    {
      variant: "link-color",
      size: "md",
      class: "font-medium p-0",
    },
  ],
});

export type ButtonProps = {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  asChild?: boolean;
} & VariantProps<typeof buttonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      prefix,
      suffix,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isText = isTextNode(children);

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {!!prefix ? prefix : null}
        {isText ? <span className="px-.5">{children}</span> : children}
        {!!suffix ? suffix : null}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };

function isTextNode(child: React.ReactNode): boolean {
  return typeof child === "string" || typeof child === "number";
}
