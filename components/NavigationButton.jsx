import Image from "next/image";
import Link from "next/link";

import returnLogo from "../public/assets/arrow-left.svg";

function NavigationButton({ text, icon, to, primary }) {
  return (
    <Link
      href={to || "/routine"}
      className={
        primary ? "primary-button primary-button_red" : "primary-button "
      }
    >
      {icon === "1" && (
        <Image src={returnLogo} alt="Return" className="icon--sm" />
      )}
      <span>{text}</span>
    </Link>
  );
}
export default NavigationButton;
