import { useQuery } from "@tanstack/react-query";
import { getUserEvents } from "../services/Event";

export const useUserEvents = (userId) => {
  return useQuery({
    queryKey: ["events", userId],
    queryFn: () => getUserEvents(userId),
    enabled: !!userId,
  });
};
