import { useEffect, useRef, useState } from "react";
import styles from "./ProfileSelector.module.css";

function ProfileSelector() {
  const [profiles, setProfiles] = useState([
    { id: 1, name: "anuj" },
    { id: 2, name: "alpha" },
  ]);

  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);

  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [newProfile, setNewProfile] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(search.toLowerCase()),
  );

  function addProfile() {
    const value = newProfile.trim();

    if (!value) return;

    const profile = {
      id: Date.now(),
      name: value,
    };

    setProfiles((prev) => [...prev, profile]);

    setSelectedProfile(profile);

    setNewProfile("");

    setSearch("");
  }

  return (
    <div className={styles.container} ref={wrapperRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>
          {selectedProfile ? selectedProfile.name : "Select current profile"}
        </span>

        <span>⌄</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <input
            className={styles.search}
            placeholder="Search current profile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className={styles.list}>
            {filteredProfiles.map((profile) => (
              <button
                key={profile.id}
                className={`${styles.item} ${
                  selectedProfile?.id === profile.id ? styles.active : ""
                }`}
                onClick={() => {
                  setSelectedProfile(profile);
                  setIsOpen(false);
                }}
              >
                {profile.name}
              </button>
            ))}
          </div>

          <div className={styles.footer}>
            <input
              className={styles.addInput}
              placeholder="Profile name"
              value={newProfile}
              onChange={(e) => setNewProfile(e.target.value)}
            />

            <button className={styles.addButton} onClick={addProfile}>
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSelector;
