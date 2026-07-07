import { useState } from "react";
import Card from "../Card/Card";
import Button from "../Button/Button";
import styles from "./EventForm.module.css";
import { ChevronsUpDown } from "lucide-react";
import DateTimeInput from "../dateAndTimePicker/dataTimePicker/DateTimeInput";
import Dropdown from "../DropdownSelect/DropdownSelector";

function EventForm() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [startDate, setStartDate] = useState();
  const [selectedTimezone, setSelectedTimezone] = useState();
  const [timezones, setTimezones] = useState([
    { label: "Eastern Time (ET)", value: "America/New_York" },
    { label: "India (IST)", value: "Asia/Kolkata" },
  ]);
  const [startTime, setStartTime] = useState("09:00");
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState("09:00");

  return (
    <Card>
      <h2 className={styles.title}>Create Event</h2>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Profiles</label>
          <Dropdown
            options={profiles}
            selected={selectedProfiles}
            onChange={setSelectedProfiles}
            placeholder="Select profiles..."
            searchPlaceHolderValue="Search Profile..."
            isMulti={true}
            showAddNew={true}
            onAddNew={(name) => {
              const newProfile = { id: Date.now(), name };
              setProfiles([...profiles, newProfile]);
              setSelectedProfiles([...selectedProfiles, newProfile]);
            }}
          />
        </div>

        <Dropdown
          options={timezones}
          selected={selectedTimezone}
          onChange={setSelectedTimezone}
          placeholder="Select timezone"
          isMulti={false}
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
