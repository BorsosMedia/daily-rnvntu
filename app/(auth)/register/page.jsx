"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import FunctionalButton from "../../../components/FunctionalButton";
import NavigationBar from "../../../components/NavigationBar";
import useCheckAuth from "../../../hooks/useCheckAuth";
import {
  googleSignUp,
  emailAndPasswordSignUp,
} from "../../../lib/utils/register";
import { SignUpSchema } from "../../../lib/utils/schemas/SignUpSchema";

export default function Register() {
  useCheckAuth();
  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState("password");

  const handlePasswordVisibility = () => {
    setPasswordVisibility(
      passwordVisibility === "password" ? "text" : "password",
    );
  };

  const signUpGoogle = async () => {
    const user = await googleSignUp();
    if (user) router.push("/routine");
  };

  const signUpEmail = async (data) => {
    const user = await emailAndPasswordSignUp(data);
    if (user) router.push("/routine");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  return (
    <main className="main_register_login">
      <NavigationBar />
      <h3 className="heading text-center">Register Information</h3>
      <form
        action=""
        className="sm__lg_width v-align-gap-1 form--block-container"
      >
        <div className="form_item">
          <label htmlFor="email" className="paragraph label--white">
            Email
          </label>
          <input
            type="email"
            placeholder="example@address.com"
            id="email"
            name="email"
            className="form_input"
            required
            {...register("email")}
          />
          {errors.email && (
            <span className="form_error">{errors.email.message}</span>
          )}
        </div>
        <div className="form_item">
          <div className="form_items_desc">
            <label htmlFor="password" className="paragraph label--white">
              Password
            </label>
            <span className="text--desc paragraph--grey">
              Must have at least 8 characters
            </span>
          </div>
          <div className="form_password_field">
            {passwordVisibility === "password" ? (
              <AiFillEyeInvisible
                onClick={handlePasswordVisibility}
                className="form_password_visibility icon--sm"
              />
            ) : (
              <AiFillEye
                onClick={handlePasswordVisibility}
                className="form_password_visibility icon--sm"
              />
            )}
            <input
              type={passwordVisibility}
              placeholder="********"
              id="password"
              name="password"
              className="form_password_input"
              required
              {...register("password")}
            ></input>
          </div>
          {errors.password && (
            <span className="form_error">{errors.password.message}</span>
          )}
        </div>
        <div className="form_item">
          <div className="form_items_desc">
            <label htmlFor="confirmPassword" className="paragraph label--white">
              Confirm Password
            </label>
          </div>
          <div className="form_password_field">
            {passwordVisibility === "password" ? (
              <AiFillEyeInvisible
                onClick={handlePasswordVisibility}
                className="form_password_visibility icon--sm"
              />
            ) : (
              <AiFillEye
                onClick={handlePasswordVisibility}
                className="form_password_visibility icon--sm"
              />
            )}
            <input
              type={passwordVisibility}
              placeholder="********"
              id="confirmPassword"
              name="confirmPassword"
              className="form_password_input"
              required
              {...register("confirmPassword")}
            ></input>
          </div>
          {errors.confirmPassword && (
            <span className="form_error">{errors.confirmPassword.message}</span>
          )}
        </div>
        <FunctionalButton
          text="Sign Up"
          primary={true}
          cb={handleSubmit(signUpEmail)}
        />
      </form>
      <span className="text--desc text-center paragraph--grey">or</span>
      <FunctionalButton text="Sign Up With Google" icon={1} cb={signUpGoogle} />
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
