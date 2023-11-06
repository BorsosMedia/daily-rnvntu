"use client";

import { useState } from "react";

import Link from "next/link";

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
    <main className="main_reset_password">
      <NavigationBar />
      <h3 className="heading text-center">Reset Password</h3>
      <form
        action=""
        className="sm__lg_width v-align-gap-1 form--block-container"
      >
        <div className="form_item">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="example@address.com"
            id="email"
            name="email"
            className="form_input"
            onChange={handleChange}
            value={email}
            required
          />
        </div>
        <FunctionalButton text="Submit" primary={true} cb={handleSubmit} />
      </form>
      <span className="text--desc text-center paragraph--grey">or</span>

      <p className="paragraph paragraph--grey text-center">
        <Link href={"/login"} className="inline paragraph--white">
          Login
        </Link>
      </p>
    </main>
  );
}
