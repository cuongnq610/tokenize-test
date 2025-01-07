import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const test = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    test();
  }, []);

  return <div>Hello World</div>;
}

export default App;
