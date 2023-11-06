"use client";

import { Faqs } from "../../../components/Faqs/Faqs";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import useCheckAuth from "../../../hooks/useCheckAuth";

export default function FAQ() {
  const isPremium = useCheckAuth();

  return (
    isPremium && (
      <main className="main_faq">
        <NavigationBar signedIn={true} />
        <Faqs />
      </main>
    )
  );
}
