"use client";
import styles from "./reset-password.module.css";
import Link from "next/link";
import { initFirebase } from "@/lib/utils/firebase";
import { useRouter } from "next/navigation";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import FunctionalButton from "@/components/FunctionalButton/FunctionalButton";
import { useState, useEffect } from "react";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { getPremiumStatus } from "@/lib/utils/getPremiumStatus";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const router = useRouter();
  const app = initFirebase();
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const checkPremium = async () => {
          const newPremiumStatus = await getPremiumStatus(app);
          if (!newPremiumStatus) {
            router.push("/plans");
          } else {
            router.push("/daily-routine");
          }
        };
        checkPremium();
      } else {
        setBaseUrl(`${window.location.origin}/login`);
      }
    });
  }, [app, auth, router]);

  const [email, setEmail] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/too-many-requests") {
          toast.error("Too many attempts! Try again later", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (errorCode === "auth/invalid-email") {
          toast.error("The email address is not valid", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (errorCode === "auth/user-not-found") {
          toast.error("The user doesn't exist", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
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
        }
      });
  };

  return (
    <main className={styles.main}>
      <NavigationBar />
      <div className={styles.register__wrapper}>
        <h3 className="heading text-center">Reset Password</h3>
        <form
          action=""
          className={`sm__lg_width v-align-gap-1 form--block-container`}
        >
          <div className={styles.form_item}>
            <label htmlFor="email" className="paragraph label--white">
              Email
            </label>
            <input
              type="email"
              placeholder="example@address.com"
              id="email"
              name="email"
              className={styles.form__input}
              onChange={handleChange}
              value={email}
              required
            />
          </div>
          <FunctionalButton Text={"Submit"} Primary={true} cb={handleSubmit} />
        </form>
        <span className="text--desc text-center paragraph--grey">or</span>
        <div className="has__account">
          <p className="paragraph paragraph--grey text-center">
            <Link href={"/login"} className="inline paragraph--white">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
