"use client";
import { ProductProvider } from "./product-context";

export default function Providers({ children }) {
  return <ProductProvider>{children}</ProductProvider>;
}
