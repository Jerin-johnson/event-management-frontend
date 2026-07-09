import axios from "./AxiosInstance";
import { formatTimezoneLabel } from "../utils/FormatTimeZone";

export const getTimeZones = async () => {
  try {
    const response = await axios.get("/timezones");
    console.log("the response", response.data.data);
    const data = response.data.data.map((timezone) => ({
      label: formatTimezoneLabel(timezone),
      value: timezone,
    }));

    // console.log("the data", data);
    return data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch timezones";

    throw new Error(message);
  }
};
