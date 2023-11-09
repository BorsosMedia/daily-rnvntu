const HowToEdit = () => {
  const paragraph = "paragraph paragraph--white";
  const list = "list--container-x";

  return (
    <article>
      <h2 className="heading text-center primary-accent">How to use editor:</h2>
      <ol>
        <li className={paragraph}>Click on whiteboard</li>
        <li className={paragraph}>
          Press TAB key or click on + button to add a new element
        </li>
        <li className={paragraph}>
          Select between the available elements:
          <ul className={list}>
            <li>Heading h1: For main title. Only one per routine.</li>
            <li>
              Heading h2: To add Personal Recommendations title. Only one per
              routine.
            </li>
            <li>Heading h3: To add exercise title.</li>
            <li>Heading h4: To add Break Times.</li>
            <li>Text: To add Instructions section for exercises.</li>
            <li>
              List: To create Set Lists. Click ENTER to add a new list item.
            </li>
          </ul>
        </li>
      </ol>
      <h3 className="subheading primary-accent">Notes:</h3>
      <ul className={list}>
        <li className={paragraph}>
          You can add a new element by clicking ENTER once you have finished
          with the one you are on.
        </li>
        <li className={paragraph}>
          By default, the created heading element is a h3. To change it to a
          different one, write the title first and then click on the
          Click-to-Tune icon it will appear on the leftside of the element,
          where the + icon was.
        </li>
        <li className={paragraph}>
          You can delete or change the position of the element by selecting the
          corresponding option on the Click-to-Tune icon.
        </li>
      </ul>
    </article>
  );
};

export default HowToEdit;
