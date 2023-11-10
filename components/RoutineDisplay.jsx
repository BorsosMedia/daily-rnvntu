import Image from "next/image";

import CoreTraining from "./CoreTraining";
import Faqs from "./Faqs";
import logo from "../public/assets/logo.png";

const RoutineDisplay = ({ routine }) => {
  return (
    <article>
      {routine?.length > 0 && (
        <section className="sm__lg_width">
          <div
            className="v-align-gap-1 m-top-1-5"
            style={{ overflowWrap: "anywhere" }}
          >
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
                        <h1
                          key={block.id}
                          className="heading text-center m-top-2 v-align-gap-1 primary-accent"
                        >
                          {block.data.text}
                        </h1>
                      );
                    case 2:
                      return (
                        <h2
                          key={block.id}
                          className="heading text-center m-top-2 v-align-gap-1 primary-accent"
                        >
                          {block.data.text}
                        </h2>
                      );
                    case 3:
                      return (
                        <h3
                          key={block.id}
                          className="subheading text-center v-align-gap-1 "
                        >
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
        </section>
      )}
      <hr />
      <CoreTraining />
      <hr />
      <Faqs />
      <section className="align-center">
        <Image src={logo} alt="logo" className="logo--sm opacity-2" />
      </section>
    </article>
  );
};

export default RoutineDisplay;
