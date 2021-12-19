import React from "react";

export function ConnectWalletButton({ connectWallet }) {
  return (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );
}
