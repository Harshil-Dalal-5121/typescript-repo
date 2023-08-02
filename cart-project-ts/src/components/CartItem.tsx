import React, { ChangeEvent, ReactElement } from "react";
import {
  CartItemType,
  ReducerAction,
  ReducerActiontype,
} from "../context/CartProvider";
import { XCircleFill } from "react-bootstrap-icons";

type CartItemProps = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActiontype;
};

const CartItem = ({ item, dispatch, REDUCER_ACTIONS }: CartItemProps) => {
  const lineTotal: number = Number(item.qty * item.price);

  const highestQty: number = 20 > item.qty ? 20 : item.qty;

  const optionValues: number[] = Array.from(
    { length: highestQty },
    (_, i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((value) => {
    return (
      <option key={`opt${value}`} value={value}>
        {value}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () => {
    dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });
  };
  const content = (
    <li className="cart-list-item">
      <div className="cart-item">
        {/* <div className="cart-image">
          <img src={`https://picsum.photos/200`} alt={item.name} />
        </div> */}
        <div className="cart-item-desc">
          <div aria-label="item-name">{item.name}</div>
          <div aria-label="item-price-per-piece">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(item.price)}
          </div>
          <label htmlFor="itemQty" className="offscreen">
            Item Quantity
          </label>
          <select
            name="itemQty"
            id="itemQty"
            className="cart-select"
            value={item.qty}
            aria-label="Item Quantity"
            onChange={onChangeQty}
          >
            {options}
          </select>
          <div className="item-subtotal">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(lineTotal)}
          </div>
          <button
            className="cart-item-remove-button"
            title="Remove from cart"
            onClick={onRemoveFromCart}
          >
            Remove From Cart <XCircleFill />
          </button>
        </div>
      </div>
    </li>
  );

  return content;
};

export default CartItem;
