import { useContext } from "react";
import CartContext, { UseCartContextType } from "../context/CartProvider";

const UseCart = (): UseCartContextType => {
  return useContext(CartContext);
};

export default UseCart;
