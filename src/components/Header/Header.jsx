import Dropdown from "../DropdownSelect/DropdownSelector";
import styles from "./Header.module.css";
import { useState } from "react";

function Header() {
  const [currentProfile, setCurrentProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  return (
    <header className={styles.header}>
      <div className={styles.header_left_section}>
        <h1>Event Management</h1>
        <p>Create and manage events across multiple timezones.</p>
      </div>

      <div className={styles.header_right_section}>
        <Dropdown
          options={profiles}
          selected={selectedProfiles}
          onChange={setSelectedProfiles}
          placeholder="Select Current Profile..."
          searchPlaceHolderValue="Search Profile..."
          isMulti={false}
          showAddNew={true}
          labelKey="name"
          valueKey="id"
          onAddNew={(name) => {
            const newProfile = { id: Date.now(), name };
            setProfiles([...profiles, newProfile]);
            setSelectedProfiles([...selectedProfiles, newProfile]);
          }}
        />
      </div>
    </header>
  );
}

export default Header;
