import { useQuery } from "@tanstack/react-query";
import { getTimeZones } from "../services/TimeZone";
import toast from "react-hot-toast";

export function useTimeZones() {
  return useQuery({
    queryKey: ["timezones"],

    queryFn: getTimeZones,

    staleTime: Infinity,

    retry: 2,

    onError: (error) => {
      toast.error(error.message || "Failed to create profile");
    },
  });
}
