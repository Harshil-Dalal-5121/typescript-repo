import React from "react";

type UserType = {
  id: number;
  name: string;
};

const fibFunc = (num: number): number => {
  if (num < 2) return num;

  return fibFunc(num - 1) + fibFunc(num - 2);
};

const myNum: number = 20;

const App = () => {
  const [count, setCount] = React.useState<number>(0);
  const [users, SetUsers] = React.useState<UserType[] | null>([]);

  React.useEffect(() => {
    console.log("mounting");

    return () => {
      console.log("unmounting");
    };
  }, [users]);

  const addFunction = React.useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
    ): void => {
      setCount((prev) => prev + 1);
    },
    []
  );

  const result = React.useMemo<number>((): number => {
    return fibFunc(myNum);
  }, [myNum]);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={addFunction}>Add</button>
      <h2>{result}</h2>
    </div>
  );
};

export default App;
