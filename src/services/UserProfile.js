import axios from "./AxiosInstance";

export const getUserProfiles = async ({
  search = "",
  pageParam = null,
  limit = 10,
}) => {
  try {
    const response = await axios.get("/users", {
      params: { search, cursor: pageParam, limit },
    });

    return response.data.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch profiles";
    throw new Error(message);
  }
};

export const createUserProfile = async (payload) => {
  try {
    const { data } = await axios.post("/users", payload);
    return data.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to create profile";
    throw new Error(message);
  }
};
