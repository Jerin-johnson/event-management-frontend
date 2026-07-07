import styles from "./Header.module.css";
import ProfileSelector from "../profileSelector/ProfileSelector";
import { useState } from "react";

function Header() {
  const [currentProfile, setCurrentProfile] = useState([]);

  return (
    <header className={styles.header}>
      <div>
        <h1>Event Management</h1>
        <p>Create and manage events across multiple timezones.</p>
      </div>

      <ProfileSelector
        isMultiSelect={false}
        selectedProfiles={currentProfile}
        setSelectedProfiles={setCurrentProfile}
        placeholder="Select current profile"
        controlWidthOfContainerClassName={styles.controlProfileSelectorWidth}
      />
    </header>
  );
}

export default Header;
