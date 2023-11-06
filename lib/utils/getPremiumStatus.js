import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "./firebase";
import { freeTrialCheck } from "./stripePayment";

export const getPremiumStatus = async (userId) => {
  if (!userId) throw new Error("User not logged in");

  const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
  const q = query(
    subscriptionsRef,
    where("status", "in", ["trialing", "active"])
  );

  const freeTrial = await freeTrialCheck();
  console.log(
    freeTrial
      ? "There was no previous subscription. Free trial available."
      : "There was a previous subscription. No free trials"
  );

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log("Subscription snapshot", snapshot.docs.length);
        if (snapshot.docs.length === 0) {
          console.log("No active or trialing subscriptions found");
          resolve(false);
        } else {
          console.log("Active or trialing subscription found");
          resolve(true);
        }
        unsubscribe();
      },
      reject
    );
  });
};
