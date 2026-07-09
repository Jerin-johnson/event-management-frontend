import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../DropdownSelect/DropdownSelector";
import styles from "./Header.module.css";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { setCurrentProfile } from "../../store/slice/UserProfileSlice";
import { useCreateUserProfile } from "../../hooks/useCreateUserProfile";
import { useUserProfiles } from "../../hooks/useUserProfiles";
import { useProfileSelector } from "../../hooks/useProfileSelector";

function Header() {
  const dispatch = useDispatch();
  const currentProfile = useSelector(
    (state) => state.userProfile.currentProfile,
  );

  console.log("the currentProfile is", currentProfile);

  const {
    search,
    setSearch,
    profiles,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    createProfile,
  } = useProfileSelector();

  return (
    <header className={styles.header}>
      <div className={styles.header_left_section}>
        <h1>Event Management</h1>
        <p>Create and manage events across multiple timezones.</p>
      </div>

      <div className={styles.header_right_section}>
        <Dropdown
          isLoading={isLoading}
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
          loadingText="Loading Profiles..."
          loadingMoreText="Loading More Profiles..."
          emptyText="No Profiles Found"
          errorText="Unable to load profiles."
          retryButtonText="Retry"
        />
      </div>
    </header>
  );
}

export default Header;
