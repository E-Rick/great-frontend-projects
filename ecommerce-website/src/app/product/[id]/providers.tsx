"use client";
import { ProductProvider } from "./context/product-context";

export default function Providers({ children }) {
  return <ProductProvider>{children}</ProductProvider>;
}
