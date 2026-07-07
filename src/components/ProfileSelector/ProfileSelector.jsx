import { useEffect, useRef, useState } from "react";
import styles from "./ProfileSelector.module.css";
import { CheckIcon, ChevronsUpDown, PlusIcon } from "lucide-react";
import { Search } from "lucide-react";

function ProfileSelector({
  isMultiSelect = false,
  selectedProfiles = [],
  setSelectedProfiles,
  placeholder = "Select profiles...",
  controlWidthOfContainerClassName = "",
  controlWidthOfDropdownClassName = "",
}) {
  const [profiles, setProfiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdNewProfile, setIsAddNewProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [newProfileName, setNewProfileName] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setIsAddNewProfile(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filteredProfiles = profiles.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  function toggleProfile(profile) {
    if (isMultiSelect) {
      const isSelected = selectedProfiles.some((p) => p.id === profile.id);
      if (isSelected) {
        setSelectedProfiles(
          selectedProfiles.filter((p) => p.id !== profile.id),
        );
      } else {
        setSelectedProfiles([...selectedProfiles, profile]);
      }
    } else {
      // Single Select (Header)
      setSelectedProfiles([profile]);
      setIsOpen(false);
    }
  }

  function addNewProfile() {
    if (!newProfileName.trim()) return;
    const newProfile = { id: Date.now(), name: newProfileName.trim() };
    setProfiles((prev) => [...prev, newProfile]);
    setNewProfileName("");
    setSearch("");

    if (!isMultiSelect) {
      setSelectedProfiles([newProfile]);
    } else {
      setSelectedProfiles((prev) => [...prev, newProfile]);
    }
    setIsAddNewProfile(false);
  }

  const displayText = isMultiSelect
    ? selectedProfiles.length > 0
      ? `${selectedProfiles.length} profiles selected`
      : placeholder
    : selectedProfiles[0]?.name || placeholder;

  return (
    <div
      className={`${styles.container} ${controlWidthOfContainerClassName}`}
      ref={wrapperRef}
    >
      <button
        className={`${styles.trigger} ${
          selectedProfiles.length > 0 ? styles.trigger_active : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayText}</span>
        <span>
          <ChevronsUpDown className={styles.chevronsUpDown_icon} />
        </span>
      </button>

      {isOpen && (
        <div
          className={`${styles.dropdown} ${controlWidthOfDropdownClassName}`}
        >
          <div className={styles.search_container}>
            <Search className={styles.search_icon} />
            <input
              className={styles.search_input}
              placeholder="Search profiles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.profile_list_container}>
            {filteredProfiles.length === 0 && (
              <div className={styles.noProfilesMessage}>
                <p>No profiles found.</p>
              </div>
            )}

            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className={`${styles.profile_item} ${
                  selectedProfiles.some((p) => p.id === profile.id)
                    ? styles.profile_active
                    : ""
                }    ${hoveredId === profile.id ? styles.profile_hovered : ""}`}
                onMouseEnter={() => setHoveredId(profile.id)}
                onClick={() => toggleProfile(profile)}
              >
                <span className={styles.profile_text}>
                  {selectedProfiles.some((p) => p.id === profile.id) && (
                    <CheckIcon className={styles.check_icon} />
                  )}

                  {profile.name}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.addNewProfileContainer}>
            {!isAdNewProfile && (
              <div
                className={styles.addNewProfileButton}
                onClick={() => setIsAddNewProfile(!isAdNewProfile)}
              >
                <PlusIcon className={styles.plusIcon} />
                <span>Add Profile</span>
              </div>
            )}

            {isAdNewProfile && (
              <div className={styles.addNewProfileInputContainer}>
                <input
                  className={styles.addNewProfileInput}
                  placeholder="Add new profile"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                />
                <button className={styles.addButton} onClick={addNewProfile}>
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSelector;
