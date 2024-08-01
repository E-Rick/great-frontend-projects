"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, {
  createContext,
  useContext,
  useMemo,
  useOptimistic,
} from "react";

type ProductState = {
  [key: string]: string;
} & {
  image?: string;
};

type ProductContextType = {
  state: ProductState;
  updateOption: (name: string, value: string) => ProductState;
  removeOption: (name: string) => ProductState;
  updateImage: (index: string) => ProductState;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const getInitialState = () => {
    const params: ProductState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update,
    }),
  );

  const updateOption = (name: string, value: string) => {
    const newState = { [name]: value };
    setOptimisticState(newState);
    return { ...state, ...newState };
  };

  const removeOption = (name: string) => {
    const newState = Object.fromEntries(
      Object.entries(state).filter(([key, value]) => key !== name),
    );
    console.log(`🚀 --------------------------------------🚀`);
    console.log(`🚀 ~ removeOption ~ newState:`, newState);
    console.log(`🚀 --------------------------------------🚀`);
    setOptimisticState(newState);
    return { ...newState };
  };

  const updateImage = (index: string) => {
    const newState = { image: index };
    setOptimisticState(newState);
    return { ...state, ...newState };
  };

  const value = useMemo(
    () => ({
      state,
      updateOption,
      removeOption,
      updateImage,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}

export function useUpdateURL() {
  const router = useRouter();

  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search);

    // Remove keys that are not in the new state
    Array.from(newParams.keys()).forEach((key) => {
      if (!(key in state)) {
        newParams.delete(key);
      }
    });

    // Set new parameters from the state
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    router.push(`?${newParams.toString()}`, { scroll: false });
  };
}
