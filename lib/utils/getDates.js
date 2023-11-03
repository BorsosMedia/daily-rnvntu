export const getEditorDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const getRoutineDisplayDate = (date = false) => {
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
  const convertedDate = date && date.split("-");
  let fullDate;
  if (convertedDate) {
    fullDate = new Date(convertedDate[0], convertedDate[1], convertedDate[2]);
  } else {
    fullDate = new Date();
  }
  return `${days[fullDate.getDay()]}, ${
    months[fullDate.getMonth()]
  } ${fullDate.getDate()}`;
};