"use client";

import { useRouter } from "next/navigation";
import { BiRightArrowAlt } from "react-icons/bi";

import styles from "./plans.module.css";
import NavigationBar from "../../../components/NavigationBar";
import useCheckAuth from "../../../hooks/useCheckAuth";
import { getCheckoutUrl } from "../../../lib/utils/stripePayment";

export default function Plans() {
  const trial = useCheckAuth();
  const router = useRouter();

  const handleCheckout = async (priceId) => {
    const checkoutUrl = await getCheckoutUrl(priceId);
    router.push(checkoutUrl);
  };

  return (
    <main className={styles.main}>
      <NavigationBar signedIn={true} />
      <div className={`${styles.plan_type__container} sm_sm__lg_width`}>
        <h3 className="heading text-center">Choose Your Plan</h3>
        <div className={styles.plan__card}>
          <h4 className="heading span-price text-center">Monthly</h4>
          <h4 className="heading price__heading text-center">
            <span>$</span>6
          </h4>

          <button
            className={styles.button_container}
            onClick={() =>
              handleCheckout(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID)
            }
          >
            <BiRightArrowAlt className={styles.icon__sm} />
          </button>
        </div>
        <div className={`${styles.plan__card} `}>
          <h4 className="heading span-price text-center">Annual</h4>
          <h4 className="heading price__heading text-center">
            <span>$</span>60
          </h4>

          <button
            className={styles.button_container}
            onClick={() =>
              handleCheckout(process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID)
            }
          >
            <BiRightArrowAlt className={styles.icon__sm} />
          </button>
        </div>

        {trial && (
          <>
            <p className="text--desc paragraph--grey text-center">or</p>
            <p
              className={`paragraph paragraph--white text-center text-underline pointer ${styles.trial}`}
              onClick={() =>
                handleCheckout(
                  process.env.NEXT_PUBLIC_STRIPE_MONTHLY_TRIAL_PRICE_ID,
                )
              }
            >
              Start a 7-day trial
            </p>
          </>
        )}
      </div>
    </main>
  );
}
