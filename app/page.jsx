"use client";

import Image from "next/image";

import NavigationButton from "../components/NavigationButton";
import useCheckAuth from "../hooks/useCheckAuth";
import logo from "../public/assets/Logo.png";

export default function Home() {
  useCheckAuth();

  return (
    <main className="main_home">
      <header className="colTwo">
        <Image src={logo} alt="logo" className="header__logo" />
        <h6 className="text--body text--desc">2023 - USA</h6>
      </header>
      <section className="v-align-gap-1 align-center">
        <p className="paragraph paragraph--grey">
          Hardcore training has never been easier
        </p>
        <h1 className="heading text-center">
          DAILY <span className="primary-accent setAnimation">RNVNTU</span>
        </h1>
        <h5 className="heading">A very srs daily fitness program</h5>
      </section>
      <section className="v-align-gap-1 align-center">
        <NavigationButton text="Sign Up" to="/register" primary={true} />
        <NavigationButton text="Login" to="/login" />
        <span className="text--body">DAILY RNVNTU</span>
      </section>
    </main>
  );
}
