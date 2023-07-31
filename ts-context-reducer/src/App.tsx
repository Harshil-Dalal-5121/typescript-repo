import "./App.css";
import Counter from "./components/Counter";
import { CounterProvider } from "./context/CounterContext";
import { initialState } from "./context/CounterContext";

const App = () => {
  return (
    <div>
      <CounterProvider count={initialState.count} text={initialState.text}>
        <Counter>{(num: number) => <>Current Count :{num}</>}</Counter>
      </CounterProvider>
    </div>
  );
};

export default App;
