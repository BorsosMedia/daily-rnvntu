"use client";

import styles from "./editor.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initFirebase } from "@/lib/utilsfirebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import dynamic from "next/dynamic";

export default function Editor() {
  const Whiteboard = dynamic(
    () => import("../../components/Whiteboard/Whiteboard.jsx"),
    { ssr: false }
  );
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (auth.currentUser?.uid === process.env.NEXT_PUBLIC_SUPPORT_USER) {
          setIsAdmin(true);
        } else {
          router.push("/daily-routine");
        }
      } else {
        router.push("/login");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isAdmin && (
      <main className={styles.main}>
        <article className={styles.editor}>
          <Whiteboard
            formItem={styles.form_item}
            datePicker={styles.date_picker}
            formInput={styles.form__input}
            whiteboard={styles.whiteboard}
          />
        </article>
        <article>
          <h2 className="heading text-center">How to use editor:</h2>
          <ol>
            <li className="paragraph paragraph--white">Click on whiteboard</li>
            <li className="paragraph paragraph--white">
              Press TAB key or click on + button to add a new element
            </li>
            <li className="paragraph paragraph--white">
              Select between the available elements:
              <ul className="list--container-x">
                <li>Heading h1: For main title. Only one per routine.</li>
                <li>
                  Heading h2: To add Personal Recommendations title. Only one
                  per routine.
                </li>
                <li>Heading h3: To add exercise title.</li>
                <li>Heading h4: To add Break Times.</li>
                <li>Text: To add Instructions section for exercises.</li>
                <li>
                  List: To create Set Lists. Click ENTER to add a new list item.
                </li>
              </ul>
            </li>
          </ol>
          <h3 className="heading">Notes:</h3>
          <ul className="list--container-x">
            <li className="paragraph paragraph--white">
              You can add a new element by clicking ENTER once you have finished
              with the one you are on.
            </li>
            <li className="paragraph paragraph--white">
              By default, the created heading element is a h3. To change it to a
              different one, write the title first and then click on the
              Click-to-Tune icon it will appear on the leftside of the element,
              where the + icon was.
            </li>
            <li className="paragraph paragraph--white">
              You can delete or change the position of the element by selecting
              the corresponding option on the Click-to-Tune icon.
            </li>
          </ul>
        </article>
      </main>
    )
  );
}
