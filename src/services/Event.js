import axios from "./AxiosInstance";

export const getUserEvents = async (userId) => {
  const response = await axios.get(`/events/user/${userId}`);
  return response.data.data;
};

export const getEventLogs = async (eventId) => {
  const response = await axios.get(`/events/${eventId}/logs`);
  return response.data.data;
};
