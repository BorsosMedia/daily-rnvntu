"use client";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";

import { initFirebase } from "../lib/utils/firebase";
import { getPortalUrl } from "../lib/utils/stripePayment";
import logo from "../public/assets/Logo.png";

const NavigationBar = ({ signedIn }) => {
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
    <header className="colTwo">
      <div onClick={handleReturnButton} className="nav_link">
        <FaChevronLeft className="icon--sm label--grey" />
      </div>

      {pathname === "/routine" ? (
        process.env.NEXT_PUBLIC_SUPPORT_USER === auth.currentUser?.uid ? (
          <Link
            className="paragraph label--grey"
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
            <span className="paragraph label--grey">Manage Subscription</span>
          </button>
        )
      ) : (
        ""
      )}

      {signedIn ? (
        <button className="colTwo sign_out-button" onClick={signOut}>
          <PiSignOutBold className="icon--sm label--grey" />
          <span className="paragraph label--grey">Sign Out</span>
        </button>
      ) : (
        <Image src={logo} alt="logo" className="logo--sm header__logo" />
      )}
    </header>
  );
};

export default NavigationBar;
