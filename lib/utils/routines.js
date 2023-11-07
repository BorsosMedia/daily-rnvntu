import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
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
      a.publishDate > b.publishDate ? -1 : 1,
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

export const postRoutine = async (isDraft, routineDate, outputData) => {
  if (!routineDate) {
    toast.warn("Choose an publish date", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return false;
  } else {
    try {
      const newRoutine = {
        isDraft,
        publishDate: routineDate,
        outputData,
      };
      const docRef = await addDoc(routinesCollectionRef, newRoutine);
      toast.success(isDraft ? "Draft saved!" : "Routine created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return docRef;
    } catch (error) {
      console.error(error);
    }
  }
};

export const updateRoutine = async (isDraft, routineDate, outputData, id) => {
  if (!routineDate) {
    toast.warn("Choose a publish date", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      closeButton: false,
    });
    return false;
  } else {
    try {
      const updatedRoutine = {
        isDraft,
        publishDate: routineDate,
        outputData,
      };
      const docRef = await updateDoc(
        doc(routinesCollectionRef, id),
        updatedRoutine,
      ).then(() => "success");
      toast.success(isDraft ? "Draft saved!" : "Routine updated!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return docRef;
    } catch (error) {
      console.log(error);
    }
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
