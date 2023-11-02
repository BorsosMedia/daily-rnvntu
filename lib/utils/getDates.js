export const getEditorDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const getRoutineDisplayDate = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const fullDate = new Date();
  return `${days[fullDate.getDay()]}, ${
    months[fullDate.getMonth()]
  } ${fullDate.getDate()}`;
};

export const getPreviewRoutineDate = (date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const convertedDate = date?.split("-");
  if (date) {
    const fullDate = new Date(
      convertedDate[0],
      convertedDate[1],
      convertedDate[2]
    );
    return `${days[fullDate.getDay()]}, ${
      months[fullDate.getMonth()]
    } ${fullDate.getDate()}`;
  }
};
