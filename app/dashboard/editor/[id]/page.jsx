"use client";

import dynamic from "next/dynamic";

import styles from "./editRoutine.module.css";
import { HowToEdit } from "../../../../components/HowToEdit/HowToEdit";
import useCheckAuth from "../../../../hooks/useCheckAuth";

export default function Editor() {
  const WhiteboardUpdate = dynamic(
    () => import("../../../../components/Whiteboard/WhiteboardUpdate.jsx"),
    { ssr: false }
  );
  const isAdmin = useCheckAuth();

  let id = "";
  // if (typeof window !== "undefined") {
  // }
  id = window.location.href.split("/editor/").pop();

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
        <HowToEdit />
      </main>
    )
  );
}
