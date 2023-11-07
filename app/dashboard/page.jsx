"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaTrash } from "react-icons/fa";

import styles from "./dashboard.module.css";
import useCheckAuth from "../../hooks/useCheckAuth";
import { deleteRoutine, getRoutineList } from "../../lib/utils/routines";

export default function Dashboard() {
  const isAdmin = useCheckAuth();
  const [routines, setRoutines] = useState([]);
  const router = useRouter();

  const getRoutines = async () => {
    setRoutines(await getRoutineList());
  };

  useEffect(() => {
    getRoutines();
  }, []);

  const handleUpdate = (id) => {
    router.push(`/dashboard/editor/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteRoutine(id);
    getRoutines();
  };

  return (
    isAdmin && (
      <main className={styles.main}>
        <nav className="colTwo">
          <Link href="/routine">
            <FaChevronLeft className="icon--sm label--grey" />
          </Link>
          <Link
            href="/dashboard/editor"
            className="paragraph label--grey"
            style={{ textDecoration: "none" }}
          >
            <button className="colTwo sign_out-button">Create Routine</button>
          </Link>
        </nav>
        <section className={styles.cardsSection}>
          {routines?.map((routine) => (
            <div
              key={routine.id}
              className={routine.isDraft ? styles.cardDraft : styles.card}
            >
              <div
                className={`${
                  routine.isDraft
                    ? styles.cardDraft_details
                    : styles.card_details
                }`}
              >
                <p className={styles.text_body}>{routine.publishDate}</p>
                {routine.outputData.blocks?.map((block) => {
                  if (block.type === "header" && block.data.level === 1) {
                    return (
                      <h1 key={block.id} className={styles.text_title}>
                        {block.data.text}
                      </h1>
                    );
                  }
                  return null;
                })}
              </div>
              <button
                className={styles.card_button}
                onClick={() => handleUpdate(routine.id)}
              >
                Update Routine
              </button>

              <FaTrash
                className={styles.delete_button}
                onClick={() => {
                  handleDelete(routine.id);
                }}
              />
            </div>
          ))}
        </section>
      </main>
    )
  );
}
