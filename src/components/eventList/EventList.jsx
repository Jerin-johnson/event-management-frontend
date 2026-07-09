import { useEffect, useMemo, useState } from "react";
import Card from "../Card/Card";
import styles from "./EventList.module.css";
import EventListCard from "../eventCardList/EventCardList";
import Dropdown from "../DropdownSelect/DropdownSelector";
import { useTimeZones } from "../../hooks/useGetTimeZone";
import { useSelector } from "react-redux";
import { useUserEvents } from "../../hooks/useUserEvents";
import dayjs from "../../utils/Day";
import { useTimezoneSelector } from "../../hooks/useTimezoneSelector";
function EventList() {
  const [selectedTimezone, setSelectedTimezone] = useState(null);

  const {
    filteredTimezones,
    timezones,
    search,
    setSearch,
    isLoading,
    isError,
    error,
    refetch,
  } = useTimezoneSelector();

  useEffect(() => {
    if (!selectedTimezone && timezones.length > 0) {
      setSelectedTimezone(timezones[0]);
    }
  }, [timezones, selectedTimezone]);

  const currentProfile = useSelector(
    (state) => state.userProfile.currentProfile,
  );

  const {
    data: events = [],
    isLoading: eventsLoading,
    error: eventsError,
    refetch: refectEvents,
  } = useUserEvents(currentProfile?._id);

  console.log("the events is", events);

  const handleUpdateEvent = (updatedEvent) => {
    console.log("the updated events", updatedEvent);
  };

  const formattedEvents = useMemo(() => {
    if (!selectedTimezone) return [];

    return events.map((event) => {
      const start = dayjs.utc(event.startDateTime).tz(selectedTimezone.value);

      const end = dayjs.utc(event.endDateTime).tz(selectedTimezone.value);

      return {
        ...event,
        id: event._id,
        profiles: event.profiles,
        profileNames: event.profiles.map((p) => p.name),
        rawStartDateTime: event.startDateTime,
        rawEndDateTime: event.endDateTime,
        timezone: event.timezone,
        startDate: start.format("DD MMM YYYY"),
        startTime: start.format("hh:mm A"),
        endDate: end.format("DD MMM YYYY"),
        endTime: end.format("hh:mm A"),
        createdAt: dayjs
          .utc(event.createdAt)
          .tz(selectedTimezone.value)
          .format("DD MMM YYYY hh:mm A"),
        updatedAt: dayjs
          .utc(event.updatedAt)
          .tz(selectedTimezone.value)
          .format("DD MMM YYYY hh:mm A"),
      };
    });
  }, [events, selectedTimezone]);

  return (
    <Card className={styles.eventsCard}>
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

      {formattedEvents.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.empty}>No events found.</p>
        </div>
      ) : (
        <div className={styles.list_container}>
          {formattedEvents.map((event) => (
            <EventListCard
              key={event.id}
              event={event}
              selectedTimezone={selectedTimezone}
              onUpdate={handleUpdateEvent}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

export default EventList;
