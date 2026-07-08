import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getUserProfiles } from "../api/userProfile.api";

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

  const profiles = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.profiles) ?? [];
  }, [query.data]);

  return {
    ...query,
    profiles,
  };
}
