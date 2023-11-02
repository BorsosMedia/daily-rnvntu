"use client";
import Image from "next/image";
import Link from "next/link";
import ReturnLogo from "../../public/assets/arrow-left.svg";

function NavigationButton({ Text, Icon, Href, Primary }) {
  return (
    <Link
      href={Href || "/daily-routine"}
      className={
        Primary ? "primary-button primary-button_red" : "primary-button "
      }
    >
      {Icon === "1" && (
        <Image src={ReturnLogo} alt={"Return"} className="icon--sm" />
      )}
      <span>{Text}</span>
    </Link>
  );
}
export default NavigationButton;
