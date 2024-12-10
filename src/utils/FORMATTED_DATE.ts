import dayjs from "dayjs";

export const FORMATTED_DATE = (date) => {
  return dayjs(date).format("DD/MM/YYYY hh:mm a");
};
