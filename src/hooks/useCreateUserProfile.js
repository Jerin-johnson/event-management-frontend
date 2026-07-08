import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserProfile } from "../services/UserProfile";

export function useCreateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profiles"],
      });
    },
  });
}
