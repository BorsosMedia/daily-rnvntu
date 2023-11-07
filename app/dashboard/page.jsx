"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaTrash } from "react-icons/fa";

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
      <main className="main_dashboard">
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
        <section className="cards_section">
          {routines?.map((routine) => (
            <div
              key={routine.id}
              className={routine.isDraft ? "card card_draft" : "card"}
            >
              <div
                className={
                  routine.isDraft
                    ? "card_details card_draft_details"
                    : "card_details"
                }
              >
                <p className="card_text_body">{routine.publishDate}</p>
                {routine.outputData.blocks?.map((block) => {
                  if (block.type === "header" && block.data.level === 1) {
                    return (
                      <h1 key={block.id} className="card_text_title">
                        {block.data.text}
                      </h1>
                    );
                  }
                  return null;
                })}
              </div>
              <button
                className="card_button"
                onClick={() => handleUpdate(routine.id)}
              >
                Update Routine
              </button>

              <FaTrash
                className="card_delete_button"
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
