import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { toast } from "react-toastify";

import { initFirebase } from "./firebase";

const app = initFirebase();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const persistenceConfig = async (session) => {
  const sessionPreference = session
    ? browserSessionPersistence
    : browserLocalPersistence;
  await setPersistence(auth, sessionPreference);
};

export const googleLogin = async (session) => {
  await persistenceConfig(session);
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const emailAndPasswordLogin = async (session, credentials) => {
  await persistenceConfig(session);
  const result = await signInWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  ).catch((error) => {
    const errorMessage =
      error.code === "auth/invalid-email"
        ? "The email address is not valid"
        : error.code === "auth/user-not-found"
        ? "The user doesn't exist"
        : error.code === "auth/wrong-password"
        ? "The password is incorrect"
        : error.code === "auth/missing-password"
        ? "Please, input your password"
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
