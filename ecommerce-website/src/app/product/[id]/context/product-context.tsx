import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ProductContextReturnTypes = {
  activeColor: string | null;
  setActiveColor: Dispatch<SetStateAction<string | null>>;
  activeSize: string | number | null;
  setActiveSize: Dispatch<SetStateAction<string | number | null>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

const ProductContext = createContext<ProductContextReturnTypes>({
  activeColor: null,
  setActiveColor: () => {},
  activeSize: null,
  setActiveSize: () => {},
  quantity: 1,
  setQuantity: () => {},
});

export function ProductProvider({ children }) {
  const [activeColor, setActiveColor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  return (
    <ProductContext.Provider
      value={{
        activeColor,
        setActiveColor,
        activeSize,
        setActiveSize,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) console.error("No product context");
  return context;
}

export default useProductContext;
