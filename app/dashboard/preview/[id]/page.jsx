"use client";

import { useEffect, useState } from "react";

import RoutineDisplay from "../../../../components/RoutineDisplay";
import RoutineHeaderDisplay from "../../../../components/RoutineHeaderDisplay";
import useCheckAuth from "../../../../hooks/useCheckAuth";
import { getRoutineDisplayDate } from "../../../../lib/utils/getDates";
import { getRoutineById } from "../../../../lib/utils/routines";

export default function Preview() {
  const isAdmin = useCheckAuth();
  const [routine, setRoutine] = useState("");
  const [routineDate, setRoutineDate] = useState("");
  const id = window.location.href.split("/preview/").pop();

  const getRoutinePreview = async (id) => {
    const data = await getRoutineById(id);
    const date = getRoutineDisplayDate(data[0].publishDate);
    setRoutine(data);
    setRoutineDate(date);
  };

  useEffect(() => {
    getRoutinePreview(id);
  });

  return (
    isAdmin && (
      <main className="main_routine">
        <RoutineHeaderDisplay isPreview={routineDate} />
        <RoutineDisplay routine={routine} />
      </main>
    )
  );
}
