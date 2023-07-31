import React, { useState } from "react";
import Login from "./components/Login";
import Greet from "./components/Greet";
import Heading from "./components/Heading";
import Product from "./components/Product";
import Status from "./components/Status";
import Button from "./components/ClickButton";
import InputText from "./components/InputTextField";

export interface IProduct {
  id: number;
  title: string;
  price: number;
}

export interface Names {
  firstName: string;
  lastName: string;
}

const App = () => {
  const [search, setSearch] = useState("");
  const [delayedSearch, setDelayedSearch] = useState("");
  const products: IProduct[] = [
    {
      id: 1,
      title: "iPhone",
      price: 30000,
    },
    {
      id: 2,
      title: "Oppo",
      price: 20000,
    },
    {
      id: 3,
      title: "Realme",
      price: 10000,
    },
    {
      id: 4,
      title: "Nokia",
      price: 5000,
    },
  ];

  // const names: Names[] = [
  //   {
  //     firstName: "Harshil",
  //     lastName: "Dalal",
  //   },
  //   {
  //     firstName: "Jigar",
  //     lastName: "Palsanawala",
  //   },
  //   {
  //     firstName: "Shubh",
  //     lastName: "Modi",
  //   },
  // ];

  const names: Names = {
    firstName: "Harshil",
    lastName: "Dalal",
  };

  const filtered = products.filter((product) => {
    return search
      ? product.title.toLowerCase().includes(delayedSearch)
      : product;
  });

  const handleClick = (id: number) => {
    console.log(id);
  };

  return (
    <>
      <Login />
      <Status status="" />
      <Greet names={names} />
      <Heading>Hello</Heading>
      <InputText
        placeholder="Enter text here"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <br />
      <Product products={filtered} onClick={handleClick} isLoggedIn={true} />
      <br />
      <Button
        handleClick={() => {
          setDelayedSearch(search);
        }}
      />
    </>
  );
};

export default App;
