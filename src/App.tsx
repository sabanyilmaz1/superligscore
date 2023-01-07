import { useState } from "react";
import "./App.css";
import { Fixture } from "./components/fixture";
import { Results } from "./components/result";

function App() {
  return (
    <div className="App">
      <Results />
    </div>
  );
}

export default App;
