/* eslint-disable react/no-unescaped-entities */
"use client";

import styles from "./preview.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { initFirebase, db } from "@/lib/utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/assets/Logo.png";
import { PiSignOutBold } from "react-icons/pi";
import { BsQuestionCircleFill } from "react-icons/bs";
import { getPreviewRoutineDate } from "@/lib/utils/getDates";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Preview() {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [routine, setRoutine] = useState("");
  const [routineDate, setRoutineDate] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const routinesCollectionRef = collection(db, "routines");
  const [IsPageLoaded, setIsPageLoaded] = useState(false);
  let id = "";
  if (typeof window !== "undefined") {
    id = window.location.href.split("/preview/").pop();
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (auth.currentUser?.uid === process.env.NEXT_PUBLIC_SUPPORT_USER) {
          setIsAdmin(true);
          setIsPageLoaded(true);
          getRoutine();
        } else {
          router.push("/daily-routine");
        }
      } else {
        router.push("/login");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRoutine = async () => {
    try {
      const data = await getDocs(routinesCollectionRef);
      const filteredData = data.docs
        .map((doc) => {
          if (doc.id === id) {
            return {
              ...doc.data(),
            };
          }
          return null;
        })
        .filter((doc) => typeof doc !== "undefined");
      setRoutine(filteredData);
      const routineDate = getPreviewRoutineDate(filteredData[0].publishDate);
      setRoutineDate(routineDate);
    } catch (error) {
      console.error(error);
    }
  };

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
    <>
      {isAdmin && (
        <div className={styles.main}>
          <div className="v-align-gap-1">
            <header className="colTwo">
              <button
                className="colTwo sign__out-button"
                onClick={previewAlert}
              >
                <span className="paragraph label--grey">
                  Manage Subscription
                </span>
              </button>

              <button
                className="colTwo sign__out-button"
                onClick={previewAlert}
              >
                <PiSignOutBold className="icon--sm label--grey" />
                <span className="paragraph label--grey">Sign Out</span>
              </button>
            </header>
            <div className="colTwo">
              <div>
                <h4 className="heading">
                  FEROCIOUS{" "}
                  <span
                    className={
                      IsPageLoaded
                        ? "primary-accent setAnimation"
                        : "primary-accent"
                    }
                  >
                    INTENSITY
                  </span>
                </h4>
                <h5 className="heading">{routineDate}</h5>
              </div>
              <div>
                <Link href="#" className="icon--m" onClick={previewAlert}>
                  <BsQuestionCircleFill className="icon--sm" />
                </Link>
              </div>
            </div>
          </div>
          {routine.length > 0 && (
            <div className="sm__lg_width">
              <div className="v-align-gap-1 m-top-5">
                {routine[0]?.outputData?.blocks?.map((block) => {
                  switch (block.type) {
                    case "paragraph":
                      return (
                        <p
                          key={block.id}
                          className="paragraph paragraph--white"
                        >
                          {block.data.text}
                        </p>
                      );
                    case "header":
                      switch (block.data.level) {
                        case 1:
                          return (
                            <h1 key={block.id} className="heading text-center">
                              {block.data.text}
                            </h1>
                          );
                        case 2:
                          return (
                            <h2
                              key={block.id}
                              className="heading text-center m-top-2 v-align-gap-1"
                            >
                              {block.data.text}
                            </h2>
                          );
                        case 3:
                          return (
                            <h3 key={block.id} className="heading text-center">
                              {block.data.text}
                            </h3>
                          );
                        default:
                          return (
                            <p
                              key={block.id}
                              className="paragraph text--desc paragraph--grey text-center"
                            >
                              {block.data.text}
                            </p>
                          );
                      }
                    default:
                      return (
                        <ul key={block.id} className="list--container-x">
                          {block.data.items.map((item, index) => {
                            return (
                              <li
                                key={index}
                                className="paragraph paragraph--white"
                              >
                                {item.split("<")[0]}
                              </li>
                            );
                          })}
                        </ul>
                      );
                  }
                })}
              </div>
            </div>
          )}
          <div className="sm__lg_width">
            <div className="v-align-gap-1">
              <h2 className="heading text-center m-top-2 v-align-gap-1">
                Core Training
              </h2>
              <p className="paragraph paragraph--white">
                For your core training, I would like you to do this 1-2x weekly.
                For the following movements I want you to make a point to be
                moving the load through your core, not your body or arms etc.
              </p>
              <ul className="list--container-x">
                <li className="paragraph paragraph--white">
                  <strong>Dead Stop Hanging Leg Raises</strong>
                </li>
                <p className="paragraph paragraph--white">
                  Aim for 25 Reps. If you are unable to perform this, that's
                  okay. Continue to do so every week until you eventually are.
                  Just do 1 set of this to all out failure focusing on form and
                  the cues I gave you above.
                </p>
                <li className="paragraph paragraph--white">
                  <strong>Standing Rope Crunch</strong>
                </li>
                <p className="paragraph paragraph--white">
                  Work up to a Max Set of 15 Reps. You can progressive overload
                  here like we are in our normal workouts. Beat the log book!
                </p>
                <li className="paragraph paragraph--white">
                  <strong>Ab Wheel Roll Outs</strong>
                </li>
                <p className="paragraph paragraph--white">
                  Roll out into a fully lengthened position. If you are unable
                  to do this you can start with using your knees first. Do this
                  for 10-15 Reps.
                </p>
              </ul>
              <p className="paragraph paragraph--white">
                *You can train abs as often as you'd like. I suggest 1-2x a
                week.
              </p>
            </div>
          </div>
          <hr style={{ width: "100%" }} />
          <div className={`${styles.faq_container} sm__lg_width`}>
            <h2 className="heading text-center">Frequently Asked Questions</h2>
            <div className={styles.faq_item}>
              <h4 className="heading">When do the workouts update?</h4>
              <p className="paragraph paragraph--white">
                Everyday at midnight your local time.
              </p>
            </div>
            <div className={styles.faq_item}>
              <h4 className="heading">What is the current training split?</h4>
              <ul className="list--container-x">
                <li className="paragraph paragraph--white">
                  Day 1: CHEST + BICEPS
                </li>
                <li className="paragraph paragraph--white">Day 2: SHOULDERS</li>
                <li className="paragraph paragraph--white">Day 3: ARMS</li>
                <li className="paragraph paragraph--white">Day 4: QUADS</li>
                <li className="paragraph paragraph--white">Day 5: DAY OFF</li>
                <li className="paragraph paragraph--white">
                  Day 6: BACK + HAMSTRINGS
                </li>
                <li className="paragraph paragraph--white">Day 7: DAY OFF</li>
                <li className="paragraph paragraph--white">
                  At least, twice a week: CORE TRAINING
                </li>
              </ul>
            </div>
            <div className={styles.faq_item}>
              <h4 className="heading">
                What does it mean to train with Furious Intensity?
              </h4>
              <p className="paragraph paragraph--white">
                It's like going to war as soon as you step into the gym. Nothing
                else should be on your mind except preforming every rep to the
                best of your abilities at maximum intensity.
              </p>
            </div>
            <div className={styles.faq_item}>
              <h4 className="heading">What if I miss a workout?</h4>
              <p className="paragraph paragraph--white">
                Don't stress, keep following the daily workouts as planned.
                Potentially use one of the program's rest days to catch up.
              </p>
            </div>
            <div className={styles.faq_item}>
              <h4 className="heading">
                What if I want to bring my training to the next level?
              </h4>
              <p className="paragraph paragraph--white">
                I have a full coaching program that you can check out at{" "}
                <a
                  href="https://effercoaching.com"
                  className="paragraph paragraph--white"
                >
                  effercoaching.com
                </a>
                .
              </p>
            </div>
          </div>
          <div className="align-center">
            <Image src={Logo} alt="logo" className="logo--sm opacity-2" />
          </div>
        </div>
      )}
    </>
  );
}
