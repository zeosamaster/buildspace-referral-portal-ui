import React from "react";
import { useForm } from "react-hook-form";

export function Referral({ account }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = React.useCallback(({ address }) => {}, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="address">
        <span className="address-text">
          Add an address of a friend you want to praise
        </span>
        <input className="address-input" {...register("address")} />
      </div>

      <button className="cta-button refer-button" type="submit">
        Add Referral
      </button>
    </form>
  );
}
