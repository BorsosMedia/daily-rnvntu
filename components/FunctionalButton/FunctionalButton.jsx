"use client";
import Image from "next/image";

import GoogleLogo from "../../public/assets/google-logo.svg";

function FunctionalButton({ Text, Primary, Icon, cb }) {
  return (
    <button
      onClick={cb}
      className={
        Primary === true
          ? "primary-button primary-button_red"
          : "primary-button"
      }
    >
      {Icon === "1" && (
        <Image src={GoogleLogo} alt={"Google Logo"} className="icon--sm" />
      )}
      <span>{Text}</span>
    </button>
  );
}
export default FunctionalButton;
