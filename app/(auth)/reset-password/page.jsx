"use client";

import { useState } from "react";

import Link from "next/link";

import styles from "./reset-password.module.css";
import FunctionalButton from "../../../components/FunctionalButton/FunctionalButton";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import useCheckAuth from "../../../hooks/useCheckAuth";
import resetPassword from "../../../lib/utils/resetPassword";

export default function ResetPassword() {
  useCheckAuth();
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    resetPassword(email);
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
