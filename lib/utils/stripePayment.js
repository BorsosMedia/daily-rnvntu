import { getAuth } from "firebase/auth";
import {
  addDoc,
  getDocs,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

import { initFirebase } from "./firebase";
const app = initFirebase();
const auth = getAuth(app);
const db = getFirestore(app);
const userId = auth.currentUser?.uid;

export const getCheckoutUrl = async (priceId) => {
  if (!userId) throw new Error("User is not authenticated");

  const checkoutSessionRef = collection(
    db,
    "customers",
    userId,
    "checkout_sessions"
  );
  const freeTrial = await freeTrialCheck();

  console.log(
    freeTrial
      ? "There was no previous subscription. Free trial available."
      : "There was a previous subscription. No free trials"
  );

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    trial_from_plan: freeTrial,
    success_url: `${window.location.origin}/daily-routine`,
    cancel_url: `${window.location.origin}/plans`,
  });

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data();
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        console.log("Stripe checkout URL:", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};

export const freeTrialCheck = async () => {
  const freeTrial = await getDocs(
    collection(db, "customers", userId, "subscriptions")
  );
  return freeTrial.empty;
};

export const getPortalUrl = async () => {
  try {
    const functions = getFunctions(app, "us-central1");
    const functionRef = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );
    const { data } = await functionRef({
      customerId: userId,
      returnUrl: window.location.origin,
    });
    const dataWithUrl = data;
    console.log("Reroute to Stripe portal: ", dataWithUrl.url);
    return new Promise((resolve, reject) => {
      if (dataWithUrl.url) {
        resolve(dataWithUrl.url);
      } else {
        reject(new Error("No url returned"));
      }
    });
  } catch (error) {
    console.error(error);
  }
};
