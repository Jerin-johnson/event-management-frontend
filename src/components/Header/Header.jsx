import styles from "./Header.module.css";
import ProfileSelector from "../ProfileSelector/ProfileSelector";

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <h1>Event Management</h1>

        <p>Create and manage events across multiple timezones</p>
      </div>

      <ProfileSelector />
    </header>
  );
}

export default Header;
