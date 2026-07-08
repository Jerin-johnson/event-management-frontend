import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezonePlugin from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

export const formatDateTime = (date, time) => {
  const d = dayjs(date).format("YYYY-MM-DD");
  return `${d}T${time}`;
};

export default dayjs;
