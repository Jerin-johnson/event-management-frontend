import axios from "./AxiosInstance";

export const createEvent = async (data) => {
  try {
    console.log("hai");
    const response = await axios.post("/events", data);
    return response.data.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create event";

    throw new Error(message);
  }
};

export const getUserEvents = async (userId) => {
  const response = await axios.get(`/events/user/${userId}`);
  return response.data.data;
};

export const getEventLogs = async (eventId) => {
  const response = await axios.get(`/events/${eventId}/logs`);
  return response.data.data;
};
