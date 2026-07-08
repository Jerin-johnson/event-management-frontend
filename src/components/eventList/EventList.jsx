import { useEffect, useMemo, useState } from "react";
import Card from "../Card/Card";
import styles from "./EventList.module.css";
import EventListCard from "../eventCardList/EventCardList";
import Dropdown from "../DropdownSelect/DropdownSelector";
import { useTimeZones } from "../../hooks/useGetTimeZone";

function EventList() {
  const [events, setEvents] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState(null);
  const [search, setSearch] = useState("");

  const {
    data: timezones = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useTimeZones();

  console.log("the timezone", timezones);

  useEffect(() => {
    if (!selectedTimezone && timezones.length > 0) {
      setSelectedTimezone(timezones[0]);
    }
  }, [timezones, selectedTimezone]);

  const filteredTimezones = useMemo(() => {
    if (!search.trim()) return timezones;

    return timezones.filter((timezone) =>
      timezone.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, timezones]);

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
          options={filteredTimezones}
          selected={selectedTimezone}
          onChange={setSelectedTimezone}
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
          error={isError ? error : null}
          refetch={refetch}
          loadingText="Loading Timezones..."
          emptyText="No Timezones Found"
          errorText="Unable to load timezones."
          retryButtonText="Retry"
          placeholder="Select Timezone"
          searchPlaceHolderValue="Search Timezone..."
          labelKey="label"
          valueKey="value"
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
