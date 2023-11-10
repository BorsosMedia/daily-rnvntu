const CoreTraining = () => {
  const paragraph = "paragraph paragraph--white";

  return (
    <article className="sm__lg_width">
      <section className="v-align-gap-1">
        <h2 className="heading text-center m-top-2 v-align-gap-1 primary-accent">
          Core Training
        </h2>
        <ul className="list--container-x">
          <li className={paragraph}>
            <span>
              <strong>Plank:</strong> Hold for 30-60 seconds.
            </span>
          </li>
          <li className={paragraph}>
            <span>
              <strong>Bicycle Crunches:</strong> 3 sets of 20 reps (each side).
            </span>
          </li>
          <li className={paragraph}>
            <span>
              <strong>Leg Raises:</strong> 3 sets of 12-15 reps.
            </span>
          </li>
          <li className={paragraph}>
            <span>
              <strong>Russian Twists:</strong> 3 sets of 12-15 reps (each side)
              with a weight or medicine ball.
            </span>
          </li>
          <li className={paragraph}>
            <span>
              <strong>Hanging Leg Raises:</strong> 3 sets of 10-12 reps.
            </span>
          </li>
          <li className={paragraph}>
            <span>
              <strong>Kneeling Cable Crunches:</strong> 3 sets of 12-15 reps.
            </span>
          </li>
          <li className={paragraph}>
            <span>
              <strong>Ab Wheel Rollouts:</strong> 3 sets of 10-12 reps.
            </span>
          </li>
        </ul>
        <p className={paragraph}>
          Kneeling Cable Crunches are a great alternative for targeting the core
          muscles. As always, maintain proper form and adjust the sets and
          repetitions to match your fitness level and goals.
        </p>
      </section>
    </article>
  );
};

export default CoreTraining;
