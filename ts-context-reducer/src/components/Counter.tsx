import { ReactNode } from "react";
import { useCounter, useCounterText } from "../context/CounterContext";

type ChildrenProps = {
  children: (num: number) => ReactNode;
};

const Counter = ({ children }: ChildrenProps) => {
  const { count, increment, decrement } = useCounter();
  const { text, handleTextInput } = useCounterText();

  return (
    <div className="counter-component">
      <h1>{children(count)}</h1>
      <div className="input-box">
        <input type="text" onChange={handleTextInput} />
      </div>
      <div className="buttons">
        <button className="btn btn-pls" onClick={increment}>
          +
        </button>
        <button className="btn btn-sub" onClick={decrement}>
          -
        </button>
      </div>
      <div>
        <h2>{text}</h2>
      </div>
    </div>
  );
};

export default Counter;
