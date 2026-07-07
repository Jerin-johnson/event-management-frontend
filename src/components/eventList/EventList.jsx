import { useState } from "react";
import Card from "../Card/Card";
import styles from "./EventList.module.css";
import EventListCard from "../eventCardList/EventCardList";
import Dropdown from "../DropdownSelect/DropdownSelector";

const TIMEZONE_OPTIONS = [
  { label: "Eastern Time (ET)", value: "America/New_York" },
  { label: "India (IST)", value: "Asia/Kolkata" },
];

const SAMPLE_EVENTS = [
  {
    id: 1,
    profiles: ["anuj", "alpha"],
    startDate: "Oct 14, 2025",
    startTime: "11:30 PM",
    endDate: "Oct 16, 2025",
    endTime: "11:30 PM",
    createdAt: "Oct 11, 2025 at 03:56 PM",
    updatedAt: "Oct 11, 2025 at 03:56 PM",
  },
];

function EventList() {
  const [viewTimezone, setViewTimezone] = useState(TIMEZONE_OPTIONS[0].value);
  const [events, setEvents] = useState(SAMPLE_EVENTS);
  const [selectedTimezone, setSelectedTimezone] = useState(TIMEZONE_OPTIONS[0]);
  const [timezones, setTimezones] = useState(TIMEZONE_OPTIONS);

  const handleUpdateEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev)),
    );
  };

  return (
    <Card>
      <h2 className={styles.title}>Events</h2>

      <div className={styles.formGroup}>
        <label>View in Timezone</label>
        <Dropdown
          options={timezones}
          selected={selectedTimezone}
          onChange={setSelectedTimezone}
          placeholder="Select timezone"
          isMulti={false}
        />
      </div>

      {events.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.empty}>No events found.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {events.map((event) => (
            <EventListCard
              key={event.id}
              event={event}
              onUpdate={handleUpdateEvent}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

export default EventList;
