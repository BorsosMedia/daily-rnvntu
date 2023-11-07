"use client";

import EditorLayout from "../../../../components/EditorLayout";
import useCheckAuth from "../../../../hooks/useCheckAuth";

export default function EditorUpdater() {
  const isAdmin = useCheckAuth();
  const id = window.location.href.split("/editor/").pop();

  return isAdmin && <EditorLayout id={id} />;
}
