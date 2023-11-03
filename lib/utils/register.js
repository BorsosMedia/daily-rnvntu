import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { toast } from "react-toastify";

import { initFirebase } from "./firebase";

const app = initFirebase();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const googleSignUp = async () => {
  await setPersistence(auth, browserSessionPersistence);
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const emailAndPasswordSignUp = async (data) => {
  await setPersistence(auth, browserSessionPersistence);
  const result = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  ).catch((error) => {
    const errorMessage =
      error.code === "auth/email-already-in-use"
        ? "Email already in use"
        : error.code === "auth/invalid-email"
        ? "The email address is not valid"
        : error.code === "auth/weak-password"
        ? "Please, choose a stronger password"
        : error.message;
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  });
  return result?.user;
};
