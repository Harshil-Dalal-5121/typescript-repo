import React from "react";
import { Names } from "../App";

interface GreetProps {
  names: Names;
  //   names: Names[];
}

const Greet = (props: GreetProps) => {
  return (
    <>
      {/* {names?.map((name, i) => {
        return (
          <h2 key={i}>
            Welcome, {name.firstName} {name.lastName}
          </h2>
        );
      })} */}
      <h2>
        Welcome, {props.names.firstName} {props.names.lastName}
      </h2>
    </>
  );
};

export default Greet;
