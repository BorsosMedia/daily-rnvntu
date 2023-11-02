"use client";

import NavigationBar from "@/components/NavigationBar/NavigationBar";
import styles from "./login.module.css";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { initFirebase } from "@/lib/utils/firebase";
import { useRouter } from "next/navigation";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import FunctionalButton from "@/components/FunctionalButton/FunctionalButton";
import { useState, useEffect } from "react";
import { getPremiumStatus } from "@/lib/utils/getPremiumStatus";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const app = initFirebase();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (auth.currentUser?.uid === process.env.NEXT_PUBLIC_SUPPORT_USER) {
          router.push("/daily-routine");
        } else {
          const checkPremium = async () => {
            const newPremiumStatus = await getPremiumStatus(app);
            if (!newPremiumStatus) {
              router.push("/plans");
            } else {
              router.push("/daily-routine");
            }
          };
          checkPremium();
        }
      }
    });
  }, [app, auth, router]);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [session, setSession] = useState(true);
  const [PasswordVisibility, setPasswordVisibility] = useState("password");

  function HandlePasswordVisibility() {
    setPasswordVisibility(
      PasswordVisibility === "password" ? "text" : "password"
    );
  }

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const signInGoogle = async () => {
    const sessionPreference = session
      ? browserSessionPersistence
      : browserLocalPersistence;
    await setPersistence(getAuth(), sessionPreference).then(async () => {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        goToAccount();
      }
    });
  };

  const signInEmail = async (e) => {
    e.preventDefault();
    const sessionPreference = session
      ? browserSessionPersistence
      : browserLocalPersistence;
    await setPersistence(auth, sessionPreference).then(async () => {
      const result = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      ).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/invalid-email") {
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
        } else if (errorCode === "auth/wrong-password") {
          toast.error("The password is incorrect", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (errorCode === "auth/missing-password") {
          toast.error("Please, input your password", {
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
      const user = result?.user;
      if (user) {
        goToAccount();
      }
    });
  };

  const goToAccount = () => {
    router.push("/daily-routine");
  };

  return (
    <main className={styles.main}>
      <NavigationBar LinkedTo={"/plans"} />
      <div className={styles.register__wrapper}>
        <h3 className="heading text-center">Log In</h3>
        <form
          action=""
          className={`sm__lg_width v-align-gap-1 form--block-container`}
        >
          <div className={styles.form__item}>
            <label htmlFor="email" className="paragraph label--white">
              Email
            </label>
            <input
              type="email"
              placeholder="Please, enter your email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className={styles.form__input}
              required
            />
          </div>

          <div className={styles.form__item}>
            <label htmlFor="password" className="paragraph label--white">
              Password
            </label>
            <div className={`${styles.password_field}`}>
              {PasswordVisibility === "password" ? (
                <AiFillEyeInvisible
                  onClick={HandlePasswordVisibility}
                  className={`${styles.password_visibility} icon--sm`}
                />
              ) : (
                <AiFillEye
                  onClick={HandlePasswordVisibility}
                  className={`${styles.password_visibility} icon--sm`}
                />
              )}
              <input
                type={PasswordVisibility}
                placeholder="********"
                id="password"
                name="password"
                className={`${styles.form__input} ${styles.password__input}`}
                onChange={handleChange}
                required
              ></input>
            </div>
          </div>
          <div className={styles.keep_loggedin}>
            <input
              className={styles.checkbox_loggedin}
              type="checkbox"
              name="remember"
              id="remember"
              onClick={() => {
                setSession(!session);
              }}
            />
            <label
              className="text--desc paragraph paragraph--white"
              htmlFor="remember"
            >
              Remember me
            </label>
          </div>
          <FunctionalButton Text={"Login"} Primary={true} cb={signInEmail} />
        </form>
        <span className="text--desc text-center paragraph--grey">or</span>
        <FunctionalButton
          Text={"Login With Google"}
          Icon={"1"}
          cb={signInGoogle}
        />
        <p className="text-desc__sm text-center">
          <Link href="/reset-password" className="paragraph--grey">
            Forgot your password?
          </Link>
        </p>
      </div>
      <div>
        <p className="text-center paragraph paragraph--grey">
          Don&apos;t have an account?
          <Link href={"/register"} className="inline paragraph--white">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
