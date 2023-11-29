"use client";

import Image from "next/image";

import NavigationButton from "../components/NavigationButton";
import useCheckAuth from "../hooks/useCheckAuth";
import logo from "../public/assets/logo.png";

export default function Home() {
  useCheckAuth();

  return (
    <main className="main_home">
      <header className="colTwo">
        <Image src={logo} alt="logo" className="header__logo" />
      </header>
      <section className="v-align-gap-1 align-center">
        <p className="paragraph paragraph--grey">
          It&apos;s not about luck. It&apos;s about persistence.
        </p>
        <h1 className="heading text-center">
          DAILY <span className="primary-accent setAnimation">RNVNTU</span>
        </h1>
        <h5 className="subheading">Your transformation starts here</h5>
      </section>
      <section className="v-align-gap-1 align-center">
        <NavigationButton text="Sign Up" to="/register" primary={true} />
        <NavigationButton text="Login" to="/login" />
        <p
          className="text--desc text-center paragraph paragraph--grey"
          style={{ margin: "0 10vw" }}
        >
          Join me in my daily real-time workouts, updated weekly, for just 20
          cents a day. Experience my personalized training that fits your
          schedule and goals. Elevate your fitness, one affordable step at a
          time. Results guaranteed!
        </p>
        <span className="text--body">Ready to start?</span>
      </section>
    </main>
  );
}
