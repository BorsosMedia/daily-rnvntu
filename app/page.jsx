"use client";

import styles from "./page.module.css";
import Image from "next/image";
import logo from "../public/assets/Logo.png";
import NavigationButton from "@/components/NavigationButton/NavigationButton";
import { initFirebase } from "@/lib/utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getPremiumStatus } from "@/lib/utils/getPremiumStatus";

export default function Home() {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [IsPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
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
      } else {
        setIsPageLoaded(true);
      }
    });
  }, [app, auth, router]);

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
            FEROCIOUS{" "}
            <span
              className={
                IsPageLoaded ? "primary-accent setAnimation" : "primary-accent"
              }
            >
              INTENSITY
            </span>
          </h1>
          <h5 className="heading">A very srs daily fitness program</h5>
        </div>
        <div className="v-align-gap-1 align-center">
          <NavigationButton
            Text={"Sign Up"}
            Href={"/register"}
            Primary={true}
          />
          <NavigationButton Text={"Login"} Href={"/login"} />
          <span className="text--body">EFFER COACHING</span>
        </div>
      </div>
    </main>
  );
}
