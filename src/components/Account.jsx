import React from "react";
import { ReferralContext } from "../context/ReferralContext";

export function Account({ account }) {
  const { referrals, skills, fetchReferrals } =
    React.useContext(ReferralContext);

  React.useEffect(() => {
    fetchReferrals(account);
  }, [fetchReferrals, account]);

  return (
    <div className="account">
      <span className="account-referrals">
        You have {referrals.length} referrals!
      </span>

      <div className="skills">
        {skills.map(([skill, count]) => {
          return (
            <span className="skill" key={skill}>
              {skill}: {count}
            </span>
          );
        })}
      </div>
    </div>
  );
}
