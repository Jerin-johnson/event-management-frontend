import { useState } from "react";
import useDebounce from "./useDebounce";
import { useUserProfiles } from "./useUserProfiles";
import { useCreateUserProfile } from "./useCreateUserProfile";

export function useProfileSelector() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const {
    profiles,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useUserProfiles(debouncedSearch);

  const { mutateAsync: createProfile, isPending } = useCreateUserProfile();

  return {
    search,
    setSearch,
    profiles,
    isLoading: isLoading || isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    createProfile,
  };
}
