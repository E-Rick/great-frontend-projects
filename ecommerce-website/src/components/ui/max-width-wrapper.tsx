import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px-4 lg:px-8", className)}
    >
      {children}
    </div>
  );
}
