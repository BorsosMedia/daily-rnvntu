"use client";

import { useEffect, useState } from "react";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

import { getEditorDate } from "../lib/utils/getDates";
import {
  getRoutineById,
  postRoutine,
  updateRoutine,
} from "../lib/utils/routines";

const Whiteboard = ({ id }) => {
  const router = useRouter();
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

  const getRoutine = async (id) => {
    const filteredData = await getRoutineById(id);
    setRoutineDate(filteredData[0].publishDate);
    return filteredData[0];
  };

  const handleDateChange = (event) => {
    event.preventDefault();
    setRoutineDate(event.target.value);
  };

  const handleRoutineCreation = async (isDraft, isPreview) => {
    const outputData = await editor.save();
    const docRef = await postRoutine(isDraft, routineDate, outputData);
    if (isPreview && docRef) {
      window.open(`preview/${docRef.id}`, "_blank");
      router.push(`editor/${docRef.id}`);
    } else {
      if (docRef) {
        router.push("/dashboard");
      }
    }
  };

  const handleRoutineUpdate = async (isDraft, isPreview) => {
    const outputData = await editor.save();
    const docRef = await updateRoutine(isDraft, routineDate, outputData, id);
    if (isPreview && docRef) {
      window.open(`/dashboard/preview/${id}`, "_blank");
    } else {
      if (docRef) {
        router.push("/dashboard");
      }
    }
  };

  useEffect(() => {
    editor === "" && id
      ? (async function () {
          await getRoutine(id).then((previousData) => {
            setEditor(() => initEditor(previousData.outputData));
          });
        })()
      : setEditor(() => initEditor());
  }, [id, setEditor]);

  return (
    <>
      <section className="colTwo">
        <Link href="/dashboard">
          <FaChevronLeft className="icon--sm label--white" />
        </Link>
        <button
          onClick={
            id
              ? () => handleRoutineUpdate(true)
              : () => handleRoutineCreation(true)
          }
          className="colTwo sign_out-button"
        >
          <span className="label--white">Save Draft</span>
        </button>
        <button
          onClick={
            id
              ? () => handleRoutineUpdate(true, true)
              : () => handleRoutineCreation(true, true)
          }
          className="colTwo sign_out-button"
        >
          <span className="label--white">Preview</span>
        </button>
        <button
          onClick={
            id
              ? () => handleRoutineUpdate(false)
              : () => handleRoutineCreation(false)
          }
          className="colTwo sign_out-button"
        >
          <span className="label--white">
            {id ? "Update" : "Create"} Routine
          </span>
        </button>
      </section>
      <section className="whiteboard_form_item">
        <label htmlFor="date">Publish Date:</label>
        <input
          type="date"
          name="date"
          id="date"
          value={routineDate}
          min={getEditorDate()}
          onChange={handleDateChange}
          className="whiteboard_date_picker whiteboard_form_input"
        />
      </section>
      <section id="EditorJs" className="whiteboard" />
    </>
  );
};

export default Whiteboard;
