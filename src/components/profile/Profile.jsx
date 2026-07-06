import { useState } from "react";
import Card from "../card/Card";
import ProfileForm from "../profileForm/ProfileForm";

function Profile() {
  const [profiles, setProfiles] = useState([]);

  function handleCreateProfile(name) {
    const profile = {
      id: crypto.randomUUID(),
      name,
    };

    setProfiles((prev) => [...prev, profile]);
  }

  return (
    <Card>
      <h2>Profile Management</h2>

      <ProfileForm onSubmit={handleCreateProfile} />
    </Card>
  );
}

export default Profile;
