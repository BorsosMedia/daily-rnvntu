"use client";

import Image from "next/image";

import styles from "./page.module.css";
import NavigationButton from "../components/NavigationButton/NavigationButton";
import useCheckAuth from "../hooks/useCheckAuth";
import logo from "../public/assets/Logo.png";

export default function Home() {
  useCheckAuth();

  return (
    <main className={styles.main}>
      <div className={styles.main__wrapper}>
        <div className="colTwo">
          <Image src={logo} alt="logo" className="logo--sm header__logo" />
          <h6 className="text--body text--desc">2023 - USA</h6>
        </div>
        <div className="v-align-gap-1 align-center">
          <p className="paragraph paragraph--grey">
            Hardcore training has never been easier
          </p>
          <h1 className="heading FI-heading-1 text-center">
            DAILY <span className="primary-accent setAnimation">RNVNTU</span>
          </h1>
          <h5 className="heading">A very srs daily fitness program</h5>
        </div>
        <div className="v-align-gap-1 align-center">
          <NavigationButton text="Sign Up" to="/register" primary={true} />
          <NavigationButton text="Login" to="/login" />
          <span className="text--body">DAILY RNVNTU</span>
        </div>
      </div>
    </main>
  );
}
