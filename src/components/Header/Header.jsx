import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../DropdownSelect/DropdownSelector";
import styles from "./Header.module.css";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { setCurrentProfile } from "../../store/slice/UserProfileSlice";
import { useCreateUserProfile } from "../../hooks/useCreateUserProfile";
import { useUserProfiles } from "../../hooks/useUserProfiles";

function Header() {
  const dispatch = useDispatch();

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

  const currentProfile = useSelector(
    (state) => state.userProfile.currentProfile,
  );

  return (
    <header className={styles.header}>
      <div className={styles.header_left_section}>
        <h1>Event Management</h1>
        <p>Create and manage events across multiple timezones.</p>
      </div>

      <div className={styles.header_right_section}>
        <Dropdown
          isLoading={isLoading || isPending}
          search={search}
          setSearch={setSearch}
          error={error}
          refetch={refetch}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          options={profiles}
          selected={currentProfile}
          onChange={(profile) => dispatch(setCurrentProfile(profile))}
          placeholder="Select Current Profile..."
          searchPlaceHolderValue="Search Profile..."
          isMulti={false}
          showAddNew={true}
          labelKey="name"
          valueKey="_id"
          onAddNew={(name) => createProfile({ name })}
        />
      </div>
    </header>
  );
}

export default Header;
