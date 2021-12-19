import React from "react";

import { WalletContext } from "../context/WalletContext";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { Referral } from "../components/Referral";

export function Home() {
  const { account, connect } = React.useContext(WalletContext);

  return (
    <div className="main-container">
      <div className="data-container">
        <div className="header">
          <span role="img" aria-label="wave">
            👋
          </span>{" "}
          Hey there!
        </div>

        {!account && <ConnectWalletButton connectWallet={connect} />}

        {account && <Referral account={account} />}
      </div>
    </div>
  );
}
