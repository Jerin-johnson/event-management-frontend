import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../services/Event";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,

    onSuccess: (_, variables) => {
      variables.profiles.forEach((profileId) => {
        queryClient.invalidateQueries({
          queryKey: ["events", profileId],
        });
      });
    },

    onError: (err) => {
      console.error("createEvent mutation failed:", err);
    },
  });
};
