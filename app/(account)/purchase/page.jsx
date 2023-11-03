"use client";
import { useState, useEffect } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaStripe } from "react-icons/fa";
import { ImPaypal } from "react-icons/im";

import styles from "./purchase.module.css";
import FunctionalButton from "../../../components/FunctionalButton/FunctionalButton";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import { initFirebase } from "../../../lib/utils/firebase";
import { getPremiumStatus } from "../../../lib/utils/getPremiumStatus";
import { getCheckoutUrl } from "../../../lib/utils/stripePayment";

export default function Purchase() {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [cardDetails, setCardDetails] = useState({
    number: "",
    secret: "",
    date: "",
  });

  const [plan, setPlan] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const checkPremium = async () => {
          const newPremiumStatus = await getPremiumStatus(app);
          if (newPremiumStatus) {
            router.push("/daily-routine");
          } else {
            const chosenPlan = window.location.href.split("=");
            if (chosenPlan.length < 2) {
              router.push("/plans");
            }
            setPlan(chosenPlan.pop());
          }
        };
        checkPremium();
      } else {
        router.push("/login");
      }
    });
  }, [router, app, auth]);

  const handleChange = (event) => {
    setCardDetails({
      ...cardDetails,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <main className={styles.main}>
      <NavigationBar SignOut={true} />
      <div className={styles.register__wrapper}>
        <h3 className="heading text-center">Add Payment Method</h3>
        <div className="colTwo">
          <button
            className="form--payment-card"
            onClick={async () => {
              const priceId =
                plan === "monthly"
                  ? process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
                  : process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID;
              const checkoutUrl = await getCheckoutUrl(app, priceId);
              router.push(checkoutUrl);
            }}
          >
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
          <div className={styles.form__item}>
            <label htmlFor="number" className="paragraph label--white">
              Card Number
            </label>
            <input
              type="number"
              name="number"
              id="number"
              placeholder="0000 0000 0000 0000"
              value={cardDetails.number}
              className={styles.form__input}
              onChange={handleChange}
            />
          </div>

          <div className={styles.form__item}>
            <label htmlFor="secret" className="paragraph label--white">
              CVV
            </label>
            <input
              type="password"
              name="secret"
              id="secret"
              placeholder="000"
              value={cardDetails.secret}
              className={styles.form__input}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="date" className="paragraph label--white">
              Expiry Date
            </label>
            <input
              type="text"
              name="date"
              id="date"
              placeholder="00/00"
              value={cardDetails.date}
              className={styles.form__input}
              onChange={handleChange}
            />
          </div>

          <FunctionalButton Text={"Purchase"} Primary={true} />
        </form>
      </div>
    </main>
  );
}
