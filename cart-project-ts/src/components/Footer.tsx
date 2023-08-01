import React from "react";
import UseCart from "../hooks/useCart";

type FooterProps = {
  viewCart: boolean;
};

const Footer = ({ viewCart }: FooterProps) => {
  const { totalItems, totalPrice } = UseCart();

  const year: number = new Date().getFullYear();

  const pageContent = viewCart ? (
    <div className="footer products">
      <p>Shopping Cart &copy;{year} </p>
    </div>
  ) : (
    <>
      <div className="footer cart">
        <div>Total Price: {totalPrice}</div>
        <div>Total Items: {totalItems}</div>
      </div>
      <div className="footer products">
        <p>Shopping Cart &copy;{year} </p>
      </div>
    </>
  );

  const content = <footer>{pageContent}</footer>;

  return content;
};

export default Footer;
