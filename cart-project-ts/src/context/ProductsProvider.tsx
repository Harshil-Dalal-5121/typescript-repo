import { ReactElement, createContext, useEffect, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

const initialState: ProductType[] = [];

export type UseProductContextType = { products: ProductType[] };

const initialContextState: UseProductContextType = { products: [] };

const ProductContext =
  createContext<UseProductContextType>(initialContextState);

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initialState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:3500/products")
        .then((resp) => {
          return resp.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
      return data;
    };
    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
