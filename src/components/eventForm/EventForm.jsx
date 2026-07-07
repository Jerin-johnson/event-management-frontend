import { useState } from "react";
import Card from "../Card/Card";
import Select from "../Select/Select";
import Button from "../Button/Button";
import ProfileSelector from "../profileSelector/ProfileSelector";
import styles from "./EventForm.module.css";
import { ChevronsUpDown } from "lucide-react";
import DateTimeInput from "../dateAndTimePicker/dataTimePicker/DateTimeInput";

function EventForm() {
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState("09:00");
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState("09:00");

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

        <DateTimeInput
          label="Start Date & Time"
          date={startDate}
          time={startTime}
          onDateChange={setStartDate}
          onTimeChange={setStartTime}
        />
        <DateTimeInput
          label="End Date & Time"
          date={endDate}
          time={endTime}
          onDateChange={setEndDate}
          onTimeChange={setEndTime}
        />

        <Button variant="primary" className={styles.createBtn}>
          + Create Event
        </Button>
      </div>
    </Card>
  );
}

export default EventForm;
