const Faqs = () => {
  const paragraph = "paragraph paragraph--white";
  const subheading = "subheading";
  const item = "faq_item";

  const listItems = [
    "Day 1: CHEST + BICEPS",
    "Day 2: SHOULDERS",
    "Day 3: ARMS",
    "Day 4: QUADS",
    "Day 5: DAY OFF",
    "Day 6: BACK + HAMSTRINGS",
    "Day 7: DAY OFF",
    "At least, twice a week: CORE TRAINING",
  ];

  return (
    <article className="faq_container">
      <h2 className="heading text-center">Frequently Asked Questions</h2>

      <section className={item}>
        <h4 className={subheading}>When do the workouts update?</h4>
        <p className={paragraph}>Everyday at midnight your local time.</p>
      </section>

      <section className={item}>
        <h4 className={subheading}>What is the current training split?</h4>
        <ul className="list--container-x">
          {listItems.map((item, index) => {
            return (
              <li className={paragraph} key={index}>
                {item}
              </li>
            );
          })}
        </ul>
      </section>

      <section className={item}>
        <h4 className={subheading}>
          What does it mean to train with Furious Intensity?
        </h4>
        <p className={paragraph}>
          It&apos;s like going to war as soon as you step into the gym. Nothing
          else should be on your mind except preforming every rep to the best of
          your abilities at maximum intensity.
        </p>
      </section>

      <section className={item}>
        <h4 className={subheading}>What if I miss a workout?</h4>
        <p className={paragraph}>
          Don&apos;t stress, keep following the daily workouts as planned.
          Potentially use one of the program&apos;s rest days to catch up.
        </p>
      </section>

      <section className={item}>
        <h4 className={subheading}>
          What if I want to bring my training to the next level?
        </h4>
        <p className={paragraph}>
          I have a full coaching program that you can check out at{" "}
          <a href="https://effercoaching.com" className={paragraph}>
            effercoaching.com
          </a>
          .
        </p>
      </section>
    </article>
  );
};

export default Faqs;
