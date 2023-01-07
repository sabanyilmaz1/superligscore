import React from "react";
import "./Loader.css";

export const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__loading">
        <span className="loader__text">Loading</span>
        <span className="loader__dot dot1">.</span>
        <span className="loader__dot dot2">.</span>
        <span className="loader__dot dot3">.</span>
      </div>
      <div className="gravity">
        <div className="ball"></div>
      </div>
    </div>
  );
};
