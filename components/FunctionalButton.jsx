"use client";
import Image from "next/image";

import googleLogo from "../public/assets/google-logo.svg";

function FunctionalButton({ text, primary, icon, cb }) {
  return (
    <button
      onClick={cb}
      className={
        primary === true
          ? "primary-button primary-button_red"
          : "primary-button"
      }
    >
      {icon === 1 && (
        <Image src={googleLogo} alt="Google Logo" className="icon--sm" />
      )}
      <span>{text}</span>
    </button>
  );
}
export default FunctionalButton;
