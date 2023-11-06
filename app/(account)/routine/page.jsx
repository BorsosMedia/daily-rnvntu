"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { BsQuestionCircleFill } from "react-icons/bs";

import { CoreTraining } from "../../../components/CoreTraining/CoreTraining";
import { Faqs } from "../../../components/Faqs/Faqs";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import useCheckAuth from "../../../hooks/useCheckAuth";
import { getRoutineDisplayDate } from "../../../lib/utils/getDates";
import { getRoutine } from "../../../lib/utils/routines";
import logo from "../../../public/assets/Logo.png";

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
        <div className="v-align-gap-1">
          <NavigationBar signedIn={true} />
          <div className="colTwo">
            <div>
              <h4 className="heading">
                FEROCIOUS{" "}
                <span className="primary-accent setAnimation">INTENSITY</span>
              </h4>
              <h5 className="heading">{getRoutineDisplayDate()}</h5>
            </div>
            <div>
              <Link href="/faq" className="icon--m">
                <BsQuestionCircleFill className="icon--sm" />
              </Link>
            </div>
          </div>
        </div>
        {routine?.length > 0 && (
          <div className="sm__lg_width">
            <div className="v-align-gap-1 m-top-5">
              {routine[0]?.outputData?.blocks?.map((block) => {
                switch (block.type) {
                  case "paragraph":
                    return (
                      <p key={block.id} className="paragraph paragraph--white">
                        {block.data.text}
                      </p>
                    );
                  case "header":
                    switch (block.data.level) {
                      case 1:
                        return (
                          <h1 key={block.id} className="heading text-center">
                            {block.data.text}
                          </h1>
                        );
                      case 2:
                        return (
                          <h2
                            key={block.id}
                            className="heading text-center m-top-2 v-align-gap-1"
                          >
                            {block.data.text}
                          </h2>
                        );
                      case 3:
                        return (
                          <h3 key={block.id} className="heading text-center">
                            {block.data.text}
                          </h3>
                        );
                      default:
                        return (
                          <p
                            key={block.id}
                            className="paragraph text--desc paragraph--grey text-center"
                          >
                            {block.data.text}
                          </p>
                        );
                    }
                  default:
                    return (
                      <ul key={block.id} className="list--container-x">
                        {block.data.items.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className="paragraph paragraph--white"
                            >
                              {item.split("<")[0]}
                            </li>
                          );
                        })}
                      </ul>
                    );
                }
              })}
            </div>
          </div>
        )}
        <CoreTraining />
        <hr style={{ width: "100%" }} />
        <Faqs />
        <div className="align-center">
          <Image src={logo} alt="logo" className="logo--sm opacity-2" />
        </div>
      </main>
    )
  );
}
