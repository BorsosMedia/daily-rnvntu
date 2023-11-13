const Faqs = () => {
  const paragraph = "paragraph paragraph--white";
  const subheading = "subheading";
  const item = "faq_item";
  const list = "list--container-x";

  return (
    <article className="faq_container">
      <h2 className="heading text-center primary-accent">
        Frequently Asked Questions
      </h2>

      <section className={item}>
        <h4 className={subheading}>When do the workouts update?</h4>
        <p className={paragraph}>Everyday at midnight your local time.</p>
      </section>

      <section className={item}>
        <h4 className={subheading}>
          What is hypertrophy and how do we train for it?
        </h4>
        <p className={paragraph}>
          Hypertrophy is the scientific name for muscle growth. We train for it
          by doing exercises for the specific muscles we are targeting by doing
          sets of 5-30 reps, with each set being challenging enough to bring
          your muscles close to failure.
        </p>
      </section>

      <section className={item}>
        <h4 className={subheading}>What does good technique look like?</h4>
        <p className={paragraph}>
          Generally, good technique means you don&apos;t heave or swing the
          weight, you move under control, and you go through the full range of
          motion of the exercise without deviating much from the prescribed
          path.
        </p>
      </section>

      <section className={item}>
        <h4 className={subheading}>
          How many days per week should I choose to train?
        </h4>
        <p className={paragraph}>
          Of course, while choosing more days will yield better results and
          recovery, we recommend choosing the number you are realistically able
          to stick with. You will get worse results by choosing a training day
          commitment you can&apos;t be consistent with than if you choose a
          lower weekly number of training days but make all of the sessions
          every week.
        </p>
      </section>

      <section className={item}>
        <h4 className={subheading}>
          How should I warm up and choose my starting weight?
        </h4>
        <p className={paragraph}>
          In order to find your working set weights, please warm up by following
          these guidelines, and remember that you only have to use approximate
          rep max loads, so don&apos;t worry about knowing your exact rep maxes,
          just &quot;in the vicinity&quot;.
        </p>
        <ul className={list}>
          <li className={paragraph}>
            Do your 30 rep max for 12 reps, rest a minute.
          </li>
          <li className={paragraph}>
            Do your 20 rep max for 8 reps, rest a minute.
          </li>
          <li className={paragraph}>
            Do your 10 rep max for 4 reps, rest a minute.
          </li>
          <li className={paragraph}>
            Choose any load in the 5-30 rep range and begin the working sets,
            resting as much time in between each set as gets you breathing
            normally and feeling strong again.
          </li>
        </ul>
        <p className={paragraph}>
          This is how you warm up and choose loads for the first exercise in
          your daily session. For all others, you can just do the set of 8 and
          4, or even just the set of 4 if you already feel nice and warmed up.
        </p>
        <p className={paragraph}>
          Any weight in between your 5 and 30 rep max technically works for all
          exercises, but I recommend choosing mostly weights than challenge you
          in the 5-10 rep range for beginners and weights in the 5-20 rep range
          for intermediates.
        </p>
        <p className={paragraph}>
          If you&apos;re advanced and know about load-specific and
          exercise-specific SFR, you already know what you&apos;re doing! If
          you&apos;d like to use different weights for the same exercise for
          down sets or drop sets, just choose your new weights.
        </p>
      </section>

      <section className={item}>
        <h4 className={subheading}>What should the rep range be?</h4>
        <p className={paragraph}>
          The most reliable muscle growth seems to come from training with sets
          between 5 and 30 repetitions. So long as each working (non warm-up)
          set is taken close to failure (RIR 4 or less), anywhere in this range
          is highly effective. That being said, if you do as few as 2 reps per
          set and as many as 50 in some special cases, you may still get highly
          effective muscle growth.
        </p>
      </section>

      <section className={item}>
        <h4 className={subheading}>How long should I rest?</h4>
        <p className={paragraph}>
          After every set, you should rest long enough to:
        </p>
        <ul className={list}>
          <li className={paragraph}>No longer be breathing super heavy.</li>
          <li className={paragraph}>
            Feel mentally strong and ready for another hard set.
          </li>
          <li className={paragraph}>
            Not be crampy in a supporting muscle (like being fatigued in your
            lower back before another squat set, for example).
          </li>
          <li className={paragraph}>
            Be recovered enough in the target muscle to be able to do at least 5
            reps on your next set.
          </li>
        </ul>
        <p className={paragraph}>
          So long as you&apos;re resting long enough to check all 4 boxes,
          you&apos;re resting long enough! Because some exercises make you more
          tired than others, the amount of rest time may differ wildly between
          exercises. For a small muscle exercise like the calf raise, you might
          only need 10 seconds to check all the boxes before your next set. For
          a large muscle exercise like the squat, you might need 3 or even 5
          minutes of rest between sets. You can also rest longer if you like,
          but no shorter than what it takes to check all 4 boxes!
        </p>
      </section>

      <section className={item}>
        <h4 className={subheading}>Can I do my exercises out of order?</h4>
        <p className={paragraph}>
          Yes, you can. Especially if you&apos;re in a rush and someone is using
          the machine you wanted to use next. For the most optimal results,
          especially if you&apos;re a competitive athlete, I recommend sticking
          to the prescribed order as often as possible and only changing
          exercise orders when absolutely necessary.
        </p>
      </section>

      <section className={item}>
        <h4 className={subheading}>
          What if I stop getting sore/pumped from my workouts?
        </h4>
        <p className={paragraph}>
          This can happen for a lot of reasons. Just remember to use great
          technique and push yourself hard on the sets you&apos;re doing. If you
          really have trouble getting sore or getting anything like a decent
          pump over a few weeks of time, taking 2 weeks off of training and
          easing back in might be your best move. This is called an active rest
          phase.
        </p>
      </section>

      <section className={item}>
        <h4 className={subheading}>
          What if I want to bring my training to the next level?
        </h4>
        <p className={paragraph}>
          Check out my personalized coaching plans at{" "}
          <a href="https://www.rnvntucoaching.com/" target="_blank">
            rnvntucoaching.com
          </a>
          .
        </p>
      </section>
    </article>
  );
};

export default Faqs;
