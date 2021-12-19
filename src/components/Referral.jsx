import React from "react";

export function Referral({ account }) {
  return (
    <>
      <div className="address">
        <span className="address-text">
          Add an address of a friend you want to praise
        </span>
        <input className="address-input" />
      </div>

      <button className="cta-button refer-button">Add Referral</button>
    </>
  );
}
