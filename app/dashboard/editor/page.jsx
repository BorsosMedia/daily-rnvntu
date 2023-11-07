"use client";

import EditorLayout from "../../../components/EditorLayout";
import useCheckAuth from "../../../hooks/useCheckAuth";

export default function Editor() {
  const isAdmin = useCheckAuth();

  return isAdmin && <EditorLayout />;
}
