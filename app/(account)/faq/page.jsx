/* eslint-disable react/no-unescaped-entities */
"use client";

import styles from "./faq.module.css";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { initFirebase } from "@/lib/utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getPremiumStatus } from "@/lib/utils/getPremiumStatus";

export default function FAQ() {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (auth.currentUser?.uid === process.env.NEXT_PUBLIC_SUPPORT_USER) {
          return setIsPremium(true);
        } else {
          const checkPremium = async () => {
            const newPremiumStatus = await getPremiumStatus(app);
            setIsPremium(newPremiumStatus);
            if (!newPremiumStatus) {
              router.push("/plans");
            }
          };
          checkPremium();
        }
      } else {
        router.push("/login");
      }
    });
  }, [app, auth, router]);

  return (
    <>
      {isPremium && (
        <div className={styles.main}>
          <NavigationBar SignOut={true} />

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
        </div>
      )}
    </>
  );
}
