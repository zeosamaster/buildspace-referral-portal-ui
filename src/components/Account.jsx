import React from "react";
import { ReferralContext } from "../context/ReferralContext";

export function Account({ account }) {
  const { referrals, setAccount } = React.useContext(ReferralContext);

  React.useEffect(() => {
    setAccount(account);
  }, [setAccount, account]);

  return (
    <span className="account-referrals">You have {referrals} referrals!</span>
  );
}
