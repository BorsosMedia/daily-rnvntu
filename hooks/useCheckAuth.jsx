"use client";

import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";

import { initFirebase } from "../lib/utils/firebase";
import { getPremiumStatus } from "../lib/utils/getPremiumStatus";
import { freeTrialCheck } from "../lib/utils/stripePayment";

const useCheckAuth = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const pathname = usePathname();
  const urls = ["dashboard", "plans", "faq", "routine", "purchase"];
  const [returnedValue, setReturnedValue] = useState("");

  useEffect(() => {
    const checkPremiumUser = async (path) => {
      const premiumStatus = await getPremiumStatus(auth.currentUser?.uid);
      if (!premiumStatus && path !== "/plans" && path !== "/purchase") {
        router.push("/plans");
      } else if (!premiumStatus && path === "/purchase") {
        const plan = path.split("=");
        return plan.length < 2
          ? router.push("/plans")
          : setReturnedValue(plan.pop());
      } else if (!premiumStatus && path === "/plans") {
        const trial = await freeTrialCheck();
        setReturnedValue(trial);
      } else if (premiumStatus && path !== "/routine" && path !== "/faq") {
        router.push("/routine");
      } else {
        setReturnedValue(true);
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (auth.currentUser?.uid === process.env.NEXT_PUBLIC_SUPPORT_USER) {
          return urls.includes(pathname.split("/")[1])
            ? setReturnedValue(true)
            : router.push("/routine");
        } else {
          return checkPremiumUser(pathname);
        }
      } else if (urls.includes(pathname.split("/")[1])) {
        router.push("/login");
      } else {
        setReturnedValue("load");
      }
    });
  });

  return returnedValue;
};

export default useCheckAuth;
