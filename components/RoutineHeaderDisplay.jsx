import Link from "next/link";
import { BsQuestionCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";

import NavigationBar from "./NavigationBar";
import { getRoutineDisplayDate } from "../lib/utils/getDates";

const RoutineHeaderDisplay = ({ isPreview = false }) => {
  const previewAlert = () => {
    toast.info("This is preview mode", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      closeButton: false,
    });
  };

  return (
    <header className="v-align-gap-1">
      <NavigationBar signedIn={true} isPreview={isPreview && previewAlert} />

      <article className="colTwo">
        <section>
          <h4 className="heading">
            DAILY <span className="primary-accent setAnimation">RNVNTU</span>
          </h4>
          <h5 className="subheading">{isPreview || getRoutineDisplayDate()}</h5>
        </section>
        <section>
          <Link
            href={isPreview ? "#" : "/faq"}
            className="icon--m"
            onClick={isPreview ? () => previewAlert() : ""}
          >
            <BsQuestionCircleFill className="icon--sm" />
          </Link>
        </section>
      </article>
    </header>
  );
};

export default RoutineHeaderDisplay;
