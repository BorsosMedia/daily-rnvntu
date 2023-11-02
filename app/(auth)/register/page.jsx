"use client";
import styles from "./register.module.css";
import Link from "next/link";
import { initFirebase } from "@/lib/utils/firebase";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  browserSessionPersistence,
  setPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import FunctionalButton from "@/components/FunctionalButton/FunctionalButton";
import { useState, useEffect } from "react";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getPremiumStatus } from "@/lib/utils/getPremiumStatus";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
  const router = useRouter();
  const app = initFirebase();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [PasswordVisibility, setPasswordVisibility] = useState("password");
  const [ConfirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState("password");

  function HandlePasswordVisibility() {
    setPasswordVisibility(
      PasswordVisibility === "password" ? "text" : "password"
    );
  }

  function HandleConfirmPasswordVisibility() {
    setConfirmPasswordVisibility(
      ConfirmPasswordVisibility === "password" ? "text" : "password"
    );
  }

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
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const signUpGoogle = async () => {
    await setPersistence(auth, browserSessionPersistence);
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      goToAccount();
    }
  };

  const signUpEmail = async (data) => {
    await setPersistence(auth, browserSessionPersistence);
    const result = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        toast.error("Email already in use", {
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
      } else if (errorCode === "auth/weak-password") {
        toast.error("Please, choose a stronger password", {
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
  };

  const goToAccount = () => {
    router.push("/daily-routine");
  };

  const SignUpSchema = z
    .object({
      email: z.string().email().min(1),
      password: z
        .string()
        .min(8, { message: "Password must contain at least 8 characters" }),
      confirmPassword: z
        .string()
        .min(8, { message: "Password must contain at least 8 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  return (
    <main className={styles.main}>
      <NavigationBar />
      <div className={styles.register__wrapper}>
        <h3 className="heading text-center">Register Information</h3>
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
              required
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={styles.form_item}>
            <div className={styles.form_items_desc}>
              <label htmlFor="password" className={`paragraph label--white`}>
                Password
              </label>
              <span className="text--desc paragraph--grey">
                Must have at least 8 characters
              </span>
            </div>
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
                {...register("password")}
              ></input>
            </div>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>
          <div className={styles.form_item}>
            <div className={styles.form_items_desc}>
              <label
                htmlFor="confirmPassword"
                className={`paragraph label--white`}
              >
                Confirm Password
              </label>
            </div>
            <div className={`${styles.password_field}`}>
              {ConfirmPasswordVisibility === "password" ? (
                <AiFillEyeInvisible
                  onClick={HandleConfirmPasswordVisibility}
                  className={`${styles.password_visibility} icon--sm`}
                />
              ) : (
                <AiFillEye
                  onClick={HandleConfirmPasswordVisibility}
                  className={`${styles.password_visibility} icon--sm`}
                />
              )}
              <input
                type={ConfirmPasswordVisibility}
                placeholder="********"
                id="confirmPassword"
                name="confirmPassword"
                className={`${styles.form__input} ${styles.password__input}`}
                onChange={handleChange}
                required
                {...register("confirmPassword")}
              ></input>
            </div>
            {errors.confirmPassword && (
              <span className={styles.error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <FunctionalButton
            Text={"Sign Up"}
            Primary={true}
            cb={handleSubmit(signUpEmail)}
          />
        </form>
        <span className="text--desc text-center paragraph--grey">or</span>
        <FunctionalButton
          Text={"Sign Up With Google"}
          Icon={"1"}
          cb={signUpGoogle}
        />
      </div>
      <div className="has__account">
        <p className="paragraph paragraph--grey text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="inline paragraph--white">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
