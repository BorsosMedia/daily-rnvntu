"use client";

import { useEffect, useState } from "react";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { collection, updateDoc, doc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { toast } from "react-toastify";

import { db } from "../../lib/utils/firebase";
import { getEditorDate } from "../../lib/utils/getDates";

export default function Whiteboard({
  formItem,
  datePicker,
  formInput,
  whiteboard,
  id,
}) {
  const router = useRouter();
  const routinesCollectionRef = collection(db, "routines");
  const [routineDate, setRoutineDate] = useState("");
  const [editor, setEditor] = useState("");

  const initEditor = (previousData) => {
    try {
      return new EditorJS({
        holder: "EditorJs",
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "Enter a heading (only one h1 per routine)",
              levels: [1, 2, 3, 4],
              defaultLevel: 3,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
        },
        placeholder: "Let's create an awesome workout routine!",
        data: previousData,
      });
    } catch (error) {
      console.error(error);
    }
  };

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
      setRoutineDate(filteredData[0].publishDate);
      return filteredData[0];
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    editor === "" &&
      (async function () {
        await getRoutine().then((previousData) => {
          setEditor(() => initEditor(previousData.outputData));
        });
      })();
  }, []);

  const handleSaveDraft = async (event) => {
    event.preventDefault();
    if (!routineDate) {
      toast.warn("Choose a publish date", {
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
    } else {
      try {
        const outputData = await editor.save();
        const newDraft = {
          isDraft: true,
          publishDate: routineDate,
          outputData,
        };
        await updateDoc(doc(routinesCollectionRef, id), newDraft).then(() => {
          toast.success("Draft saved!", {
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
        router.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePreview = async (event) => {
    event.preventDefault();
    if (!routineDate) {
      toast.warn("Choose a publish date", {
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
    } else {
      try {
        const outputData = await editor.save();
        const newDraft = {
          isDraft: true,
          publishDate: routineDate,
          outputData,
        };
        await updateDoc(doc(routinesCollectionRef, id), newDraft).then(() => {
          toast.success("Draft saved!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          window.open(`/dashboard/preview/${id}`, "_blank");
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdateRoutine = async (event) => {
    event.preventDefault();
    if (!routineDate) {
      toast.warn("Choose an publish date", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        const outputData = await editor.save();
        const newRoutine = {
          isDraft: false,
          publishDate: routineDate,
          outputData,
        };
        await updateDoc(doc(routinesCollectionRef, id), newRoutine).then(() => {
          toast.success("Routine updated!", {
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
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDateChange = (event) => {
    event.preventDefault();
    setRoutineDate(event.target.value);
  };

  return (
    <div>
      <nav className="colTwo">
        <Link href="/dashboard">
          <FaChevronLeft className="icon--sm label--grey" />
        </Link>
        <button onClick={handleSaveDraft} className="colTwo sign_out-button">
          <span className="paragraph label--grey">Save Draft</span>
        </button>
        <button onClick={handlePreview} className="colTwo sign_out-button">
          <span className="paragraph label--grey">Preview</span>
        </button>
        <button
          onClick={handleUpdateRoutine}
          className="colTwo sign_out-button"
        >
          <span className="paragraph label--grey">Update Routine</span>
        </button>
      </nav>
      <section className={formItem}>
        <label htmlFor="date">Publish Date:</label>
        <input
          type="date"
          name="date"
          id="date"
          value={routineDate}
          min={getEditorDate()}
          onChange={handleDateChange}
          className={`${datePicker} ${formInput}`}
        />
      </section>
      <section id="EditorJs" className={whiteboard} />
    </div>
  );
}
