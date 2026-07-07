import { useState } from "react";
import Card from "../Card/Card";
import Select from "../Select/Select";
import styles from "./EventList.module.css";

const TIMEZONE_OPTIONS = [
  { label: "Eastern Time (ET)", value: "America/New_York" },
  { label: "India (IST)", value: "Asia/Kolkata" },
];

function EventList() {
  const [viewTimezone, setViewTimezone] = useState(TIMEZONE_OPTIONS[0].value);

  return (
    <Card>
      <h2 className={styles.title}>Events</h2>

      <div className={styles.formGroup}>
        <label>View in Timezone</label>
        <Select
          options={TIMEZONE_OPTIONS}
          value={viewTimezone}
          onChange={setViewTimezone}
        />
      </div>

      <p className={styles.empty}>No events found.</p>
    </Card>
  );
}

export default EventList;
