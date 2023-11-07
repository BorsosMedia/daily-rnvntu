"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { FaStripe } from "react-icons/fa";
import { ImPaypal } from "react-icons/im";

import styles from "./purchase.module.css";
import FunctionalButton from "../../../components/FunctionalButton";
import NavigationBar from "../../../components/NavigationBar";
import useCheckAuth from "../../../hooks/useCheckAuth";
import { getCheckoutUrl } from "../../../lib/utils/stripePayment";

export default function Purchase() {
  const chosenPlan = useCheckAuth();
  const router = useRouter();
  chosenPlan === true && router.push("/plans");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    secret: "",
    date: "",
  });

  const handleChange = (event) => {
    setCardDetails({
      ...cardDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckout = async () => {
    const priceId =
      chosenPlan === "monthly"
        ? process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
        : process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID;
    const checkoutUrl = await getCheckoutUrl(priceId);
    router.push(checkoutUrl);
  };

  const inputs = [
    {
      label: "Card Number",
      type: "number",
      name: "number",
      placeholder: "0000 0000 0000 0000",
    },
    { label: "CVV", type: "password", name: "secret", placeholder: "000" },
    { label: "Expiry Date", type: "text", name: "date", placeholder: "00/00" },
  ];

  return (
    <main className={styles.main}>
      <NavigationBar signedIn={true} />
      <div className={styles.register__wrapper}>
        <h3 className="heading text-center">Add Payment Method</h3>
        <div className="colTwo">
          <button className="form--payment-card" onClick={handleCheckout}>
            <FaStripe className="payment--form-icon stripe--logo" />
          </button>
          <button className="form--payment-card">
            <ImPaypal className="payment--form-icon paypal--logo" />
          </button>
        </div>
        <span className="text-center paragraph--grey">or</span>
        <form
          action=""
          className=" v-align-gap-1 form--block-container form--payment-container"
        >
          {inputs.map((input) => {
            return (
              <div className="form_item" key={input.name}>
                <label htmlFor={input.name} className="paragraph label--white">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  name={input.name}
                  id={input.name}
                  placeholder={input.placeholder}
                  value={cardDetails[input.name]}
                  className="form_input"
                  onChange={handleChange}
                />
              </div>
            );
          })}
          <FunctionalButton text="Purchase" primary={true} />
        </form>
      </div>
    </main>
  );
}
