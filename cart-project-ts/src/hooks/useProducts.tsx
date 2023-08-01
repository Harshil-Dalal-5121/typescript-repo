import { useContext } from "react";
import ProductContext, {
  UseProductContextType,
} from "../context/ProductsProvider";

const useProducts = (): UseProductContextType => {
  return useContext(ProductContext);
};

export default useProducts;
