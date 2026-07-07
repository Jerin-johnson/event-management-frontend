import { useState } from "react";
import Card from "../Card/Card";
import Select from "../Select/Select";
import Button from "../Button/Button";
import ProfileSelector from "../ProfileSelector/ProfileSelector";
import styles from "./EventForm.module.css";

function EventForm() {
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  return (
    <Card>
      <h2 className={styles.title}>Create Event</h2>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Profiles</label>
          <ProfileSelector
            isMultiSelect={true}
            selectedProfiles={selectedProfiles}
            setSelectedProfiles={setSelectedProfiles}
          />
        </div>

        <Select
          label="Timezone"
          options={[
            { label: "Eastern Time (ET)", value: "America/New_York" },
            { label: "India (IST)", value: "Asia/Kolkata" },
          ]}
        />

        <div className={styles.formGroup}>
          <label>Start Date & Time</label>
          <div className={styles.dateTimeRow}>
            <input type="date" className={styles.input} />
            <input type="time" className={styles.input} defaultValue="09:00" />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>End Date & Time</label>
          <div className={styles.dateTimeRow}>
            <input type="date" className={styles.input} />
            <input type="time" className={styles.input} defaultValue="09:00" />
          </div>
        </div>

        <Button variant="primary" className={styles.createBtn}>
          + Create Event
        </Button>
      </div>
    </Card>
  );
}

export default EventForm;
