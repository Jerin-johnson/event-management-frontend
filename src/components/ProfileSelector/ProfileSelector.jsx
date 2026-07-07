import { useEffect, useRef, useState } from "react";
import styles from "./ProfileSelector.module.css";
import { ChevronsUpDown } from "lucide-react";

function ProfileSelector({
  isMultiSelect = false,
  selectedProfiles = [],
  setSelectedProfiles,
  placeholder = "Select current profile",
}) {
  const [profiles, setProfiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newProfileName, setNewProfileName] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
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
  }

  // Fixed display logic
  const displayText = isMultiSelect
    ? selectedProfiles.length > 0
      ? `${selectedProfiles.length} profiles selected`
      : placeholder
    : selectedProfiles[0]?.name || placeholder;

  return (
    <div className={styles.container} ref={wrapperRef}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <span>{displayText}</span>
        <span>
          <ChevronsUpDown className={styles.chevronsUpDown_icon} />
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <input
            className={styles.search}
            placeholder="Search profiles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className={styles.list}>
            {filteredProfiles.map((profile) => (
              <button
                key={profile.id}
                className={`${styles.item} ${
                  selectedProfiles.some((p) => p.id === profile.id)
                    ? styles.active
                    : ""
                }`}
                onClick={() => toggleProfile(profile)}
              >
                {selectedProfiles.some((p) => p.id === profile.id) && "✓ "}
                {profile.name}
              </button>
            ))}
          </div>

          <div className={styles.footer}>
            <input
              className={styles.addInput}
              placeholder="Add new profile"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
            />
            <button className={styles.addButton} onClick={addNewProfile}>
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSelector;
