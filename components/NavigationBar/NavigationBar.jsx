"use client";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BsQuestionCircleFill } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";

import styles from "./navigationBar.module.css";
import { initFirebase } from "../../lib/utils/firebase";
import { getPortalUrl } from "../../lib/utils/stripePayment";
import Logo from "../../public/assets/Logo.png";

export default function NavigationBar({ LinkedTo, SignOut, IsDailyRoutine }) {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const pathname = usePathname();

  function HandleReturnButton() {
    if (router) {
      if (pathname === "/login" || pathname === "/register") {
        return router.push("/");
      } else {
        return router.back();
      }
    } else {
      return alert("Dumb");
    }
  }

  const signOut = () => {
    auth.signOut();
    router.push("/");
  };

  const manageSubscription = async () => {
    const portalUrl = await getPortalUrl(app);
    router.push(portalUrl);
  };

  return (
    <header className={`${styles.main} colTwo`}>
      {IsDailyRoutine ? (
        <Link href="/faq" className="icon--m">
          <BsQuestionCircleFill className="icon--sm label--grey" />
        </Link>
      ) : (
        <div onClick={HandleReturnButton} className={styles.nav__link}>
          <FaChevronLeft className="icon--sm label--grey" />
        </div>
      )}

      {pathname === "/routine" &&
        process.env.NEXT_PUBLIC_SUPPORT_USER === auth.currentUser?.uid && (
          <Link
            className="paragraph label--grey"
            style={{ textDecoration: "none" }}
            href="/dashboard"
          >
            <button className="colTwo sign__out-button">Dashboard</button>
          </Link>
        )}

      {pathname === "/routine" &&
        process.env.NEXT_PUBLIC_SUPPORT_USER !== auth.currentUser?.uid && (
          <button
            className="colTwo sign__out-button"
            onClick={manageSubscription}
          >
            <span className="paragraph label--grey">Manage Subscription</span>
          </button>
        )}

      {SignOut ? (
        <button className="colTwo sign__out-button" onClick={signOut}>
          <PiSignOutBold className="icon--sm label--grey" />
          <span className="paragraph label--grey">Sign Out</span>
        </button>
      ) : (
        <Image src={Logo} alt="" className="logo--sm header__logo" />
      )}
    </header>
  );
}
