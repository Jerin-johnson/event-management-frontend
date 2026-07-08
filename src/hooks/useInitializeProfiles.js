import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserProfiles } from "./useUserProfiles";
import { setProfiles } from "../store/slices/userProfileSlice";

export function useInitializeUserProfiles() {
  const dispatch = useDispatch();

  const query = useUserProfiles();

  useEffect(() => {
    if (!query.data) return;

    dispatch(setProfiles(query.data.profiles));
  }, [query.data, dispatch]);

  return query;
}
