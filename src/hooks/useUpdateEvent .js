import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEvent } from "../services/Event";

export const useUpdateEvent = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, payload }) => updateEvent(eventId, payload),

    onSuccess: (updatedEvent) => {
      queryClient.invalidateQueries({
        queryKey: ["events", userId],
      });
    },
  });
};
