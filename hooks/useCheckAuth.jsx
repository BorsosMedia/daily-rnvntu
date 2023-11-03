"use client";

import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import { initFirebase } from "../lib/utils/firebase";
import { getPremiumStatus } from "../lib/utils/getPremiumStatus";
import { freeTrialCheck } from "../lib/utils/stripePayment";

const useCheckAuth = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [returnedValue, setReturnedValue] = useState("");

  useEffect(() => {
    const checkPremiumUser = async (url) => {
      const premiumStatus = await getPremiumStatus();
      if (
        !premiumStatus &&
        !url.includes("plans") &&
        !url.includes("purchase")
      ) {
        router.push("/plans");
      } else if (!premiumStatus && url.includes("purchase")) {
        const chosenPlan = url.split("=");
        return chosenPlan.length < 2
          ? router.push("/plans")
          : setReturnedValue(chosenPlan.pop());
      } else if (!premiumStatus && url.includes("plans")) {
        const trial = await freeTrialCheck();
        setReturnedValue(trial);
      } else if (
        premiumStatus &&
        !url.includes("routine") &&
        !url.includes("faq")
      ) {
        router.push("/routine");
      } else {
        setReturnedValue(true);
      }
    };

    onAuthStateChanged(auth, (user) => {
      const url = typeof window !== "undefined" && window.location.href;
      const baseUrl = typeof window !== "undefined" && window.location.origin;
      const urls = ["/dashboard", "/plans", "/faq", "/routine", "/purchase"];
      if (user) {
        if (auth.currentUser?.uid === process.env.NEXT_PUBLIC_SUPPORT_USER) {
          return urls.includes(url.split(baseUrl)[1])
            ? setReturnedValue(true)
            : router.push("/routine");
        } else {
          return checkPremiumUser(url);
        }
      } else if (urls.includes(url.split(baseUrl)[1])) {
        router.push("/login");
      } else {
        setReturnedValue("load");
      }
    });
  });

  return returnedValue;
};

export default useCheckAuth;
