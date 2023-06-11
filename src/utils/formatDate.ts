export const formatDate = (date: Date) => {
  const dateToFormat = new Date(date);
  const day = dateToFormat.getDate();
  const month = addZero(dateToFormat.getMonth() + 1);
  const year = dateToFormat.getFullYear();

  const formattedDate = day + "/" + month + "/" + year;

  return formattedDate;
};

const addZero = (month: number) => {
  if (month < 10) {
    return "0" + month;
  }
  return month;
};
