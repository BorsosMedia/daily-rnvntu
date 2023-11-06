"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import FunctionalButton from "../../../components/FunctionalButton/FunctionalButton";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import useCheckAuth from "../../../hooks/useCheckAuth";
import { googleLogin, emailAndPasswordLogin } from "../../../lib/utils/login";

export default function Login() {
  useCheckAuth();
  const router = useRouter();

  const [session, setSession] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handlePasswordVisibility = () => {
    setPasswordVisibility(
      passwordVisibility === "password" ? "text" : "password",
    );
  };

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const signInGoogle = async () => {
    const user = await googleLogin(session);
    if (user) router.push("/routine");
  };

  const signInEmail = async (event) => {
    event.preventDefault();
    const user = await emailAndPasswordLogin(session, credentials);
    if (user) router.push("/routine");
  };

  return (
    <main className="main_register_login">
      <NavigationBar />
      <h3 className="heading text-center">Log In</h3>
      <form
        action=""
        className="sm__lg_width v-align-gap-1 form--block-container"
      >
        <div className="form_item">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Please, enter your email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="form_input"
            required
          />
        </div>

        <div className="form_item">
          <label htmlFor="password">Password</label>
          <div className="form_password_field">
            {passwordVisibility === "password" ? (
              <AiFillEyeInvisible
                onClick={handlePasswordVisibility}
                className="form_password_visibility"
              />
            ) : (
              <AiFillEye
                onClick={handlePasswordVisibility}
                className="form_password_visibility"
              />
            )}
            <input
              type={passwordVisibility}
              placeholder="********"
              id="password"
              name="password"
              onChange={handleChange}
              className="form_password_input"
              required
            ></input>
          </div>
        </div>
        <div className="form_keep_loggedin">
          <input
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
        <FunctionalButton text="Login" primary={true} cb={signInEmail} />
      </form>
      <p className="text--desc text-center paragraph--grey">or</p>
      <FunctionalButton text="Login With Google" icon={1} cb={signInGoogle} />
      <p className="text-desc__sm text-center">
        <Link href="/reset-password" className="paragraph--grey">
          Forgot your password?
        </Link>
      </p>

      <p className="text-center paragraph paragraph--grey">
        Don&apos;t have an account?
        <Link href={"/register"} className="inline paragraph--white">
          Sign Up
        </Link>
      </p>
    </main>
  );
}
