"use client";
import styles from "./plans.module.css";
import { BiRightArrowAlt } from "react-icons/bi";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { initFirebase } from "@/lib/utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPremiumStatus } from "@/lib/utils/getPremiumStatus";
import { getCheckoutUrl, freeTrialCheck } from "@/lib/utils/stripePayment";

export default function Plans() {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [freeTrial, setFreeTrial] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const checkPremium = async () => {
          const newPremiumStatus = await getPremiumStatus(app);
          if (newPremiumStatus) {
            router.push("/daily-routine");
          }
        };
        checkPremium();
        const checkerTrial = async () => {
          const trial = await freeTrialCheck(app);
          setFreeTrial(trial);
        };
        checkerTrial();
      } else {
        router.push("/login");
      }
    });
  }, [app, auth, router]);

  return (
    <main className={styles.main}>
      <NavigationBar SignOut={true} />
      <div className={`${styles.plan_type__container} sm_sm__lg_width`}>
        <h3 className="heading text-center">Choose Your Plan</h3>
        <div className={styles.plan__card}>
          <h4 className="heading span-price text-center">Monthly</h4>
          <h4 className="heading price__heading text-center">
            <span>$</span>6
          </h4>

          <button
            className={styles.button_container}
            onClick={async () => {
              // router.push("/purchase?plan=monthly");
              const checkoutUrl = await getCheckoutUrl(
                app,
                process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
              );
              router.push(checkoutUrl);
            }}
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
            onClick={async () => {
              // router.push("/purchase?plan=annual");
              const checkoutUrl = await getCheckoutUrl(
                app,
                process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID
              );
              router.push(checkoutUrl);
            }}
          >
            <BiRightArrowAlt className={styles.icon__sm} />
          </button>
        </div>

        {freeTrial && (
          <>
            <p className="text--desc paragraph--grey text-center">or</p>
            <p
              className={`paragraph paragraph--white text-center text-underline pointer ${styles.trial}`}
              onClick={async () => {
                const checkoutUrl = await getCheckoutUrl(
                  app,
                  process.env.NEXT_PUBLIC_STRIPE_MONTHLY_TRIAL_PRICE_ID
                );
                router.push(checkoutUrl);
              }}
            >
              Start a 7-day trial
            </p>
          </>
        )}
      </div>
    </main>
  );
}
