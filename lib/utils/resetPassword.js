import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

import { initFirebase } from "./firebase";

const resetPassword = (email) => {
  const app = initFirebase();
  const auth = getAuth(app);
  const baseUrl = `${window.location.origin}/login`;

  sendPasswordResetEmail(auth, email, { url: baseUrl })
    .then(() => {
      toast.success("Email sent!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      toast.info("Check your email and close this page!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    })
    .catch((error) => {
      const errorMessage =
        error.code === "auth/too-many-requests"
          ? "Too many attempts! Try again later"
          : error.code === "auth/invalid-email"
          ? "The email address is not valid"
          : error.code === "auth/user-not-found"
          ? "The user doesn't exist"
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
};

export default resetPassword;
