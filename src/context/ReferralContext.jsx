import React from "react";
import { getContract } from "../utils/metamask";
import REFERRAL_CONTRACT_JSON from "../contracts/ReferralPortal.json";

const REFERRAL_CONTRACT_ADDRESS = "0xAf0A46Fc71AC925dE299478fB00C2C37ae9b4cAD";
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
      setReferrals(
        refs.map((r) => ({
          ...r,
          timestamp: new Date(r.timestamp.toNumber() * 1000),
        }))
      );
    } catch (error) {
      setReferrals([]);
    }
  }, []);

  const addReferral = React.useCallback(async (address, skill) => {
    const tx = await contract.addReferral(address, skill);
    await tx.wait();
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

  React.useEffect(() => {
    const onNewReferral = (from, to, skill) => {
      const newReferral = { referral: to, skill, timestamp: new Date() };
      console.log("A new referral was performed", newReferral);
      setReferrals((prevState) => [...prevState, newReferral]);
    };

    contract.on("NewReferral", onNewReferral);

    return () => {
      contract.off("NewReferral", onNewReferral);
    };
  }, []);

  const value = { referrals, skills, fetchReferrals, addReferral };

  return (
    <ReferralContext.Provider value={value}>
      {children}
    </ReferralContext.Provider>
  );
}
