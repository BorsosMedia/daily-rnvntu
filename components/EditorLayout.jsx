import dynamic from "next/dynamic";

import HowToEdit from "../components/HowToEdit";

const EditorLayout = ({ id = null }) => {
  const Whiteboard = dynamic(() => import("../components/Whiteboard.jsx"), {
    ssr: false,
  });

  return (
    <main className="main_editor">
      <article className="editor">
        <Whiteboard id={id} />
      </article>
      <HowToEdit />
    </main>
  );
};

export default EditorLayout;
