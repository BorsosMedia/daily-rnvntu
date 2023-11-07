"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { BsQuestionCircleFill } from "react-icons/bs";

import NavigationBar from "../../../components/NavigationBar";
import RoutineLayout from "../../../components/RoutineLayout";
import useCheckAuth from "../../../hooks/useCheckAuth";
import { getRoutineDisplayDate } from "../../../lib/utils/getDates";
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
        <header className="v-align-gap-1">
          <NavigationBar signedIn={true} />
          <article className="colTwo">
            <section>
              <h4 className="heading">
                FEROCIOUS{" "}
                <span className="primary-accent setAnimation">INTENSITY</span>
              </h4>
              <h5 className="heading">{getRoutineDisplayDate()}</h5>
            </section>
            <section>
              <Link href="/faq" className="icon--m">
                <BsQuestionCircleFill className="icon--sm" />
              </Link>
            </section>
          </article>
        </header>
        <RoutineLayout routine={routine} />
      </main>
    )
  );
}
