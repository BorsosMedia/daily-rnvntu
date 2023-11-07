"use client";

import dynamic from "next/dynamic";

import HowToEdit from "../../../components/HowToEdit";
import useCheckAuth from "../../../hooks/useCheckAuth";

export default function Editor() {
  const Whiteboard = dynamic(
    () => import("../../../components/Whiteboard.jsx"),
    { ssr: false },
  );
  const isAdmin = useCheckAuth();

  return (
    isAdmin && (
      <main className="main_editor">
        <article className="editor">
          <Whiteboard />
        </article>
        <HowToEdit />
      </main>
    )
  );
}
