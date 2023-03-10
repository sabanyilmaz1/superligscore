import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Navbar } from "./components/navbar";
import "./index.css";

import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Routes,
} from "react-router-dom";
import { Fixture } from "./components/fixture";
import { Results } from "./components/result";
import { Table } from "./components/table";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Fixture />} />
        <Route path="/results" element={<Results />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
