const CoreTraining = () => {
  const paragraph = "paragraph paragraph--white";

  const list = [
    {
      item: "Dead Stop Hanging Leg Raises",
      paragraph:
        "Aim for 25 Reps. If you are unable to perform this, that&apos;s okay. Continue to do so every week until you eventually are. Just do 1 set of this to all out failure focusing on form and the cues I gave you above.",
    },
    {
      item: "Standing Rope Crunch",
      paragraph:
        "Work up to a Max Set of 15 Reps. You can progressive overload here like we are in our normal workouts. Beat the log book!",
    },
    {
      item: "Ab Wheel Roll Outs",
      paragraph:
        "Roll out into a fully lengthened position. If you are unable to do this you can start with using your knees first. Do this for 10-15 Reps.",
    },
  ];

  return (
    <article className="sm__lg_width">
      <section className="v-align-gap-1">
        <h2 className="heading text-center m-top-2 v-align-gap-1 primary-accent">
          Core Training
        </h2>
        <p className={paragraph}>
          For your core training, I would like you to do this 1-2x weekly. For
          the following movements I want you to make a point to be moving the
          load through your core, not your body or arms etc.
        </p>
        <ul className="list--container-x">
          {list.map((bullet, index) => {
            return (
              <div key={index}>
                <li className={paragraph} style={{ marginBottom: "10px" }}>
                  <strong>{bullet.item}</strong>
                </li>
                <p className={paragraph}>{bullet.paragraph}</p>
              </div>
            );
          })}
        </ul>
        <p className={paragraph}>
          *You can train abs as often as you&apos;d like. I suggest 1-2x a week.
        </p>
      </section>
    </article>
  );
};

export default CoreTraining;
