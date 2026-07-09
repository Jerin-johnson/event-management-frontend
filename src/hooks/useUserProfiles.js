import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { getUserProfiles } from "../services/UserProfile";
import toast from "react-hot-toast";

export function useUserProfiles(search) {
  const query = useInfiniteQuery({
    queryKey: ["profiles", search],

    initialPageParam: null,

    queryFn: ({ pageParam }) =>
      getUserProfiles({
        pageParam,
        search,
      }),

    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.nextCursor : undefined,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Unable to load profiles");
    }
  }, [query.error]);

  const profiles = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.profiles) ?? [];
  }, [query.data]);

  return {
    ...query,
    profiles,
  };
}
