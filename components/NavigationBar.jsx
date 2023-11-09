"use client";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";

import { initFirebase } from "../lib/utils/firebase";
import { getPortalUrl } from "../lib/utils/stripePayment";
import logo from "../public/assets/logo.png";

const NavigationBar = ({ signedIn, isPreview }) => {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const pathname = usePathname();

  function handleReturnButton() {
    if (pathname === "/login" || pathname === "/register") {
      return router.push("/");
    } else {
      return router.back();
    }
  }

  const signOut = () => {
    auth.signOut();
    router.push("/");
  };

  const manageSubscription = async () => {
    const portalUrl = await getPortalUrl();
    router.push(portalUrl);
  };

  return (
    <article className="colTwo">
      <section onClick={isPreview || handleReturnButton} className="nav_link">
        <FaChevronLeft className="icon--sm" />
      </section>

      {pathname === "/routine" ? (
        process.env.NEXT_PUBLIC_SUPPORT_USER === auth.currentUser?.uid ? (
          <Link
            className="paragraph label--white"
            style={{ textDecoration: "none" }}
            href="/dashboard"
          >
            <button className="colTwo sign_out-button">Dashboard</button>
          </Link>
        ) : (
          <button
            className="colTwo sign_out-button"
            onClick={manageSubscription}
          >
            <span className="paragraph label--white">Manage Subscription</span>
          </button>
        )
      ) : isPreview ? (
        <button className="colTwo sign_out-button" onClick={isPreview}>
          <span className="paragraph label--white">Manage Subscription</span>
        </button>
      ) : (
        ""
      )}

      {signedIn ? (
        <button
          className="colTwo sign_out-button"
          onClick={isPreview || signOut}
        >
          <PiSignOutBold className="icon--sm label--white" />
          <span className="label--white">Sign Out</span>
        </button>
      ) : (
        <Image src={logo} alt="logo" className="logo--sm header__logo" />
      )}
    </article>
  );
};

export default NavigationBar;
