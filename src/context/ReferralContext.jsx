import React from "react";
import { getContract } from "../utils/metamask";
import REFERRAL_CONTRACT_JSON from "../contracts/ReferralPortal.json";

const REFERRAL_CONTRACT_ADDRESS = "0x669CaC40299B2B45ba6ce156E851B7fAa3768a9b";
const contract = getContract(
  REFERRAL_CONTRACT_ADDRESS,
  REFERRAL_CONTRACT_JSON.abi
);

export const ReferralContext = React.createContext({
  setAccount: async () => 0,
});

export function ReferralContextProvider({ children }) {
  const [referrals, setReferrals] = React.useState(0);

  const setAccount = React.useCallback(async (address) => {
    try {
      const refs = await contract.getReferrals(address);
      setReferrals(refs.toNumber());
    } catch (error) {
      setReferrals(0);
    }
  }, []);

  const value = { referrals, setAccount };

  return (
    <ReferralContext.Provider value={value}>
      {children}
    </ReferralContext.Provider>
  );
}
