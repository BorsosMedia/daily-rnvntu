"use client";

import { useEffect, useState } from "react";

import RoutineDisplay from "../../../components/RoutineDisplay";
import RoutineHeaderDisplay from "../../../components/RoutineHeaderDisplay";
import useCheckAuth from "../../../hooks/useCheckAuth";
import { getRoutine } from "../../../lib/utils/routines";

export default function DailyRoutine() {
  const isPremium = useCheckAuth();
  const [routine, setRoutine] = useState([]);

  const getTodaysRoutine = async () => {
    setRoutine(await getRoutine());
  };

  useEffect(() => {
    getTodaysRoutine();
  }, []);

  return (
    isPremium && (
      <main className="main_routine">
        <RoutineHeaderDisplay />
        <RoutineDisplay routine={routine} />
      </main>
    )
  );
}
