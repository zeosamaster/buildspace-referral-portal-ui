import * as React from "react";
import "./App.css";

export default function App() {
  return (
    <div className="main-container">
      <div className="data-container">
        <div className="header">
          <span role="img" aria-label="wave">
            👋
          </span>{" "}
          Hey there!
        </div>

        <div className="address">
          <span className="address-text">
            Add an address of a friend you want to praise
          </span>
          <input className="address-input" />
        </div>

        <button className="refer-button">Add Referral</button>
      </div>
    </div>
  );
}
