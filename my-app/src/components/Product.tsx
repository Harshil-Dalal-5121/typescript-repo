import React from "react";
import { IProduct } from "../App";

interface ProductProps {
  products: IProduct[];
  onClick(id: number): void;
  isLoggedIn: boolean;
}

const Product = ({ products, onClick, isLoggedIn }: ProductProps) => {
  return (
    <>
      <table style={{ border: "1px solid black" }}>
        <tbody>
          {isLoggedIn ? (
            products.map((product) => (
              <tr key={product.id}>
                <td key={product.id}>
                  {product.id} {`)`}
                </td>
                <td onMouseOver={() => onClick(product.id)}>{product.title}</td>
                <td>{product.price}</td>
              </tr>
            ))
          ) : (
            <>No Products</>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Product;
