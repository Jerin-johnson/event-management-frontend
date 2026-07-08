import axios from "./AxiosInstance";

export const getUserProfiles = async ({
  search = "",
  pageParam = null,
  limit = 10,
}) => {
  const { data } = await axiosInstance.get("/users", {
    params: {
      search,
      cursor: pageParam,
      limit,
    },
  });

  return data.data;
};

export const createUserProfile = async (payload) => {
  const { data } = await axiosInstance.post("/users", payload);

  return data.data;
};
