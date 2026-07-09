import { useState, useMemo } from "react";
import { useTimeZones } from "./useGetTimeZone";

export function useTimezoneSelector() {
  const [search, setSearch] = useState("");

  const {
    data: timezones = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useTimeZones();

  const filteredTimezones = useMemo(() => {
    if (!search.trim()) return timezones;

    return timezones.filter((timezone) =>
      timezone.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, timezones]);

  return {
    timezones,
    filteredTimezones,
    search,
    setSearch,
    isLoading,
    isError,
    error,
    refetch,
  };
}
