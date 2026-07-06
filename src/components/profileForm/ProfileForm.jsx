import { useState } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import styles from "./ProfileForm.module.css";

function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const value = name.trim();

    if (!value) return;

    onSubmit(value);

    setName("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Profile Name"
        placeholder="Enter profile name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button type="submit">Add Profile</Button>
    </form>
  );
}

export default ProfileForm;
