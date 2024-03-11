import moment from "moment";

const invalidState = "Invalid date";

export const formatDate = (
  isoDate: Date,
  dateFormat = "ddd MMM D YYYY",
  timeFormat = "hh:mm:ss A"
) => {
  let date = moment.utc(isoDate).local().format(dateFormat);
  let time = moment.utc(isoDate).local().format(timeFormat);

  if (date === invalidState) {
    date = "--";
  }
  if (time === invalidState) {
    time = "--";
  }

  return { date, time };
};
