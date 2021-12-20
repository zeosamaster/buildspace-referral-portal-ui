import React from "react";
import { useForm } from "react-hook-form";
import { ReferralContext } from "../context/ReferralContext";

export function Referral({ account }) {
  const { register, handleSubmit } = useForm();
  const { addReferral } = React.useContext(ReferralContext);

  const onSubmit = React.useCallback(
    async ({ address, skill }) => {
      const newCountForAddress = await addReferral(address, skill);
      console.log(`${address} now has ${newCountForAddress} referrals!`);
    },
    [addReferral]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field address">
        <span className="form-text address-text">
          Add an address of a friend you want to praise
        </span>
        <input className="form-input address-input" {...register("address")} />
      </div>

      <div className="form-field skill">
        <span className="form-text skill-text">
          What's the skill you'd like to praise?
        </span>
        <input className="form-input skill-input" {...register("skill")} />
      </div>

      <button className="cta-button refer-button" type="submit">
        Add Referral
      </button>
    </form>
  );
}
