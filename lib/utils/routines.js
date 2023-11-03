import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "./firebase";
import { getEditorDate } from "./getDates";

const routinesCollectionRef = collection(db, "routines");

export const getRoutineList = async () => {
  try {
    const data = await getDocs(routinesCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return filteredData.sort((a, b) =>
      a.publishDate > b.publishDate ? -1 : 1
    );
  } catch (error) {
    console.error(error);
  }
};

export const getRoutine = async () => {
  try {
    const data = await getDocs(routinesCollectionRef);
    const filteredData = data.docs
      .map((doc) => {
        if (doc.data().publishDate === getEditorDate() && !doc.data().isDraft) {
          return {
            ...doc.data(),
            id: doc.id,
          };
        }
        return null;
      })
      .filter((doc) => typeof doc !== "undefined");
    return filteredData;
  } catch (error) {
    console.error(error);
  }
};

export const getRoutineById = async (id) => {
  try {
    const data = await getDocs(routinesCollectionRef);
    const filteredData = data.docs
      .map((doc) => {
        if (doc.id === id) {
          return {
            ...doc.data(),
          };
        }
        return null;
      })
      .filter((doc) => typeof doc !== "undefined");
    return filteredData;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRoutine = async (id) => {
  try {
    await deleteDoc(doc(routinesCollectionRef, id)).then(() => {
      toast.success("Routine deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
    getRoutineList();
  } catch (error) {
    console.error(error);
  }
};
