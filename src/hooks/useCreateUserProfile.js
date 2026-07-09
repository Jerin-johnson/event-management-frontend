import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUserProfile } from "../services/UserProfile";

export function useCreateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      toast.success("Profile created successfully");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create profile");
    },
  });
}
