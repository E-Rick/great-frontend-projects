"use client";

import { ProductProvider } from "@/components/product/product-context";

export default function Providers({ children }) {
  return <ProductProvider>{children}</ProductProvider>;
}
