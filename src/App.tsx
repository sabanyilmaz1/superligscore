import { useState } from "react";
import "./App.css";
import { Fixture } from "./components/fixture";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Fixture />
    </div>
  );
}

export default App;
