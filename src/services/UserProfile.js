import axios from "./AxiosInstance";

export const getProfiles = async () => {
  const { data } = await axios.get("/users");
  return data.data;
};
