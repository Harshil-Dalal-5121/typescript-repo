import React, { useState } from "react";
import useCart from "../hooks/useCart";
import CartItem from "./CartItem";

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);

  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <h2>Thank you for ordering</h2>
  ) : (
    <main>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart-list">
        {cart?.map((item, i) => {
          return (
            <CartItem
              key={i}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="cart-total">
        <p>Total Items :{totalItems}</p>
        <p>Total Price :{totalPrice}</p>
        <button
          className="cart-sumbit"
          onClick={onSubmitOrder}
          disabled={!totalItems}
        >
          Place Order
        </button>
      </div>
    </main>
  );

  return pageContent;
};

export default Cart;
