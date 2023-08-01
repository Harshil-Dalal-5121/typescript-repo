import React, { FC } from "react";
import Nav from "./Nav";
import UseCart from "../hooks/useCart";

type HeaderProps = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: FC<HeaderProps> = ({ viewCart, setViewCart }: HeaderProps) => {
  const { totalPrice, totalItems } = UseCart();

  const content = (
    <header className="App-header">
      <div className="header title-bar">
        <h1>Shopping Cart</h1>
      </div>
      <div className="header price-box">
        <p>Total Items:{totalItems}</p>
        <p>Total Price:{totalPrice}</p>
        <div className="header nav">
          <Nav viewCart={viewCart} setViewCart={setViewCart} />
        </div>
      </div>
    </header>
  );
  return content;
};

export default Header;
