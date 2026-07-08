import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import DateTimeInput from "../dateAndTimePicker/dataTimePicker/DateTimeInput";
import styles from "./EditEventModal.module.css";
import Dropdown from "../DropdownSelect/DropdownSelector";

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
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState("");

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
        <Dropdown
          options={profiles}
          selected={selectedProfiles}
          onChange={setSelectedProfiles}
          placeholder="Select profiles..."
          isMulti={true}
          showAddNew={true}
          labelKey="name"
          valueKey="id"
          onAddNew={(name) => {
            const newProfile = { id: Date.now(), name };
            setProfiles([...profiles, newProfile]);
            setSelectedProfiles([...selectedProfiles, newProfile]);
          }}
        />
      </div>

      <Dropdown
        options={TIMEZONE_OPTIONS}
        selected={timezone}
        onChange={setTimezone}
        placeholder="Select timezone"
        isMulti={false}
        labelKey="label"
        valueKey="value"
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
