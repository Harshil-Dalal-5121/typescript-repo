import React, { ReactElement } from "react";
import { ProductType } from "../context/ProductsProvider";
import { ReducerAction, ReducerActiontype } from "../context/CartProvider";
import { Check } from "react-bootstrap-icons";

type ProductProps = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActiontype;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: ProductProps): ReactElement => {
  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

  const itemInCart = inCart && (
    <span>
      <Check />
      Item In Cart
    </span>
  );

  const content = (
    <>
      <div className="product" key={product.sku}>
        <img src={`https://picsum.photos/200`} alt={product.name} />
        <p>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(product.price)}
          {itemInCart}
        </p>
        <button className="btn btn-add" onClick={onAddToCart}>
          Add To Cart
        </button>
      </div>
    </>
  );

  return content;
};

export default Product;
