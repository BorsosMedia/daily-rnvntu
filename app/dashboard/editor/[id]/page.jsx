"use client";

import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import styles from "./editRoutine.module.css";
import { initFirebase } from "../../../../lib/utils/firebase";

export default function Editor() {
  const WhiteboardUpdate = dynamic(
    () => import("../../../../components/Whiteboard/WhiteboardUpdate.jsx"),
    { ssr: false }
  );
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  let id = "";
  if (typeof window !== "undefined") {
    id = window.location.href.split("/editor/").pop();
  }

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
  }, []);

  return (
    isAdmin && (
      <main className={styles.main}>
        <article className={styles.editor}>
          <WhiteboardUpdate
            formItem={styles.form_item}
            datePicker={styles.date_picker}
            formInput={styles.form__input}
            whiteboard={styles.whiteboard}
            id={id}
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
