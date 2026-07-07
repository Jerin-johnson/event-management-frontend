import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import Select from "../Select/Select";
import ProfileSelector from "../profileSelector/ProfileSelector";
import Button from "../Button/Button";
import DateTimeInput from "../dateAndTimePicker/dataTimePicker/DateTimeInput";
import styles from "./EditEventModal.module.css";

const TIMEZONE_OPTIONS = [
  { label: "Eastern Time (ET)", value: "America/New_York" },
  { label: "India (IST)", value: "Asia/Kolkata" },
];

function EditEventModal({ isOpen, onClose, event, onSave }) {
  const [profiles, setProfiles] = useState([]);
  const [timezone, setTimezone] = useState(TIMEZONE_OPTIONS[0].value);
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState("09:00");
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState("09:00");

  useEffect(() => {
    if (event) {
      setProfiles(event.profiles || []);
      setTimezone(event.timezone || TIMEZONE_OPTIONS[0].value);
      setStartDate(event.startDate);
      setStartTime(event.startTime || "09:00");
      setEndDate(event.endDate);
      setEndTime(event.endTime || "09:00");
    }
  }, [event]);

  const handleUpdate = () => {
    onSave({
      ...event,
      profiles,
      timezone,
      startDate,
      startTime,
      endDate,
      endTime,
      updatedAt: new Date().toLocaleString(),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Event"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Event
          </Button>
        </>
      }
    >
      <div className={styles.formGroup}>
        <label>Profiles</label>
        <ProfileSelector
          isMultiSelect={true}
          selectedProfiles={profiles}
          setSelectedProfiles={setProfiles}
        />
      </div>

      <Select
        label="Timezone"
        options={TIMEZONE_OPTIONS}
        value={timezone}
        onChange={setTimezone}
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
    </Modal>
  );
}

export default EditEventModal;
