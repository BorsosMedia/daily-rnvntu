"use client";

import styles from "./faq.module.css";
import { Faqs } from "../../../components/Faqs/Faqs";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import useCheckAuth from "../../../hooks/useCheckAuth";

export default function FAQ() {
  const isPremium = useCheckAuth();

  return (
    isPremium && (
      <main className={styles.main}>
        <NavigationBar signedIn={true} />

        <Faqs />
      </main>
    )
  );
}
