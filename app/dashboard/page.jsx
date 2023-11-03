"use client";

import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import styles from "./dashboard.module.css";
import { db, initFirebase } from "../../lib/utils/firebase";

export default function Dashboard() {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [routines, setRoutines] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const routinesCollectionRef = collection(db, "routines");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (auth.currentUser?.uid === process.env.NEXT_PUBLIC_SUPPORT_USER) {
          setIsAdmin(true);
          getRoutineList();
        } else {
          router.push("/daily-routine");
        }
      } else {
        router.push("/login");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRoutineList = async () => {
    try {
      const data = await getDocs(routinesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRoutines(
        filteredData.sort((a, b) => (a.publishDate > b.publishDate ? -1 : 1))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id) => {
    router.push(`/dashboard/editor/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(routinesCollectionRef, id)).then(() => {
        toast.success("Routine deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
      getRoutineList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    isAdmin && (
      <main className={styles.main}>
        <nav className="colTwo">
          <Link href="/daily-routine">
            <FaChevronLeft className="icon--sm label--grey" />
          </Link>
          <Link
            href="/dashboard/editor"
            className="paragraph label--grey"
            style={{ textDecoration: "none" }}
          >
            <button className="colTwo sign__out-button">Create Routine</button>
          </Link>
        </nav>
        <section className={styles.cardsSection}>
          {routines?.map((routine) => (
            <div
              key={routine.id}
              className={`${routine.isDraft ? styles.cardDraft : styles.card}`}
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
