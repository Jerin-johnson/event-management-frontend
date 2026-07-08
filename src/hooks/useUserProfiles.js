import { useQuery } from "@tanstack/react-query";
import { getProfiles } from "../services/UserProfile";

export const useUserProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: getProfiles,
    staleTime: 1000 * 60 * 5,
  });
};
