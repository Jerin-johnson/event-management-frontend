import { useState } from "react";
import Card from "../Card/Card";
import Select from "../Select/Select";

import styles from "./EventList.module.css";
import EventCard from "../eventListCard/EventCardList";

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
  const [events] = useState(SAMPLE_EVENTS);

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

      {events.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.empty}>No events found.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </Card>
  );
}

export default EventList;
