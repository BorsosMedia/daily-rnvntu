"use client";

import dynamic from "next/dynamic";

import styles from "./editor.module.css";
import { HowToEdit } from "../../../components/HowToEdit/HowToEdit";
import useCheckAuth from "../../../hooks/useCheckAuth";

export default function Editor() {
  const Whiteboard = dynamic(
    () => import("../../../components/Whiteboard/Whiteboard.jsx"),
    { ssr: false }
  );
  const isAdmin = useCheckAuth();

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
        <HowToEdit />
      </main>
    )
  );
}
