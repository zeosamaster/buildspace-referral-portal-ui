import React from "react";
import { getContract } from "../utils/metamask";
import REFERRAL_CONTRACT_JSON from "../contracts/ReferralPortal.json";

const REFERRAL_CONTRACT_ADDRESS = "0xc6475e5c7537c3e0CF88271e20b4c671851A2318";
const contract = getContract(
  REFERRAL_CONTRACT_ADDRESS,
  REFERRAL_CONTRACT_JSON.abi
);

export const ReferralContext = React.createContext({
  fetchReferrals: async () => 0,
  addReferral: async () => 0,
});

export function ReferralContextProvider({ children }) {
  const [referrals, setReferrals] = React.useState([]);

  const fetchReferrals = React.useCallback(async (address) => {
    try {
      const refs = await contract.getReferrals(address);
      setReferrals(refs);
    } catch (error) {
      setReferrals([]);
    }
  }, []);

  const addReferral = React.useCallback(async (address, skill) => {
    const tx = await contract.addReferral(address, skill);
    await tx.wait();

    const result = await contract.getReferrals(address);
    return result.length;
  }, []);

  const skills = React.useMemo(() => {
    const skillMap = referrals.reduce((res, { skill }) => {
      return {
        ...res,
        [skill]: (res[skill] || 0) + 1,
      };
    }, {});

    return Object.entries(skillMap);
  }, [referrals]);

  const value = { referrals, skills, fetchReferrals, addReferral };

  return (
    <ReferralContext.Provider value={value}>
      {children}
    </ReferralContext.Provider>
  );
}
