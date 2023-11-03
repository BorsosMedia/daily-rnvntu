"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import { initFirebase } from "../lib/utils/firebase";
import { getPremiumStatus } from "../lib/utils/getPremiumStatus";

const useCheckAuth = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();

  const checkPremiumUser = async (url) => {
    const premiumStatus = await getPremiumStatus(app);
    if (!premiumStatus && !url.includes("plans" || "purchase")) {
      router.push("/plans");
    } else if (!premiumStatus && url.includes("purchase")) {
      const chosenPlan = url.split("=");
      return chosenPlan.length < 2 ? router.push("/plans") : chosenPlan.pop();
    } else if (premiumStatus && !url.includes("routine" || "faq")) {
      router.push("/routine");
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const url = typeof window !== "undefined" && window.location.href;
      if (auth.currentUser?.uid === process.env.NEXT_PUBLIC_SUPPORT_USER) {
        return url.includes(
          "dashboard" || "plans" || "faq" || "routine" || "purchase"
        )
          ? true
          : router.push("/routine");
      } else {
        return checkPremiumUser(url);
      }
    } else {
      return "load";
    }
  });
};

export default useCheckAuth;
