import { useQuery } from "@tanstack/react-query";
import { getEventLogs } from "../services/Event";

export const useEventLogs = (eventId, enabled = false) => {
  return useQuery({
    queryKey: ["eventLogs", eventId],
    queryFn: () => getEventLogs(eventId),
    enabled: enabled && !!eventId,
  });
};
