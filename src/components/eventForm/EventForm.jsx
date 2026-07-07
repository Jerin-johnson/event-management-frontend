import { useState } from "react";
import Card from "../Card/Card";
import Select from "../Select/Select";
import Button from "../Button/Button";
import ProfileSelector from "../profileSelector/ProfileSelector";
import styles from "./EventForm.module.css";
import DateTimeInput from "../dateTimeInput/DateTimeInput";
import { ChevronsUpDown } from "lucide-react";

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
            controlWidthOfDropdownClassName={styles.profileDropdownHalfWidth}
          />
        </div>

        <Select
          label="Timezone"
          options={[
            { label: "Eastern Time (ET)", value: "America/New_York" },
            { label: "India (IST)", value: "Asia/Kolkata" },
          ]}
        />

        <DateTimeInput label="Start Date & Time" />
        <DateTimeInput label="End Date & Time" />

        <Button variant="primary" className={styles.createBtn}>
          + Create Event
        </Button>
      </div>
    </Card>
  );
}

export default EventForm;
