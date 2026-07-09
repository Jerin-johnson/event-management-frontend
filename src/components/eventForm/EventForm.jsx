import { useState } from "react";
import Card from "../card/Card";
import Button from "../button/Button";
import styles from "./EventForm.module.css";
import { ChevronsUpDown } from "lucide-react";
import DateTimeInput from "../dateAndTimePicker/dataTimePicker/DateTimeInput";
import Dropdown from "../DropdownSelect/DropdownSelector";
import useEventForm from "../../hooks/useEventForm";
import { useProfileSelector } from "../../hooks/useProfileSelector";
import { useTimeZones } from "../../hooks/useGetTimeZone";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import { useTimezoneSelector } from "../../hooks/useTimezoneSelector";

function EventForm() {
  const { mutateAsync: createEventMutation } = useCreateEvent();

  const {
    formData,
    errors,
    isSubmitting,
    updateField,
    addProfile,
    submitEvent,
  } = useEventForm({ createEventMutation });

  const {
    filteredTimezones,
    timezones,
    search: timeZoneSearch,
    setSearch: setTimeZoneSearch,
  } = useTimezoneSelector();

  const {
    search,
    setSearch,
    profiles,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    createProfile,
  } = useProfileSelector();

  return (
    <Card>
      <h2 className={styles.title}>Create Event</h2>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Profiles</label>
          <Dropdown
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            error={error}
            refetch={refetch}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            options={profiles}
            selected={formData.selectedProfiles}
            onChange={(value) => updateField("selectedProfiles", value)}
            placeholder="Select profiles..."
            searchPlaceHolderValue="Search Profile..."
            isMulti={true}
            showAddNew={true}
            onAddNew={(name) => createProfile({ name })}
            labelKey="name"
            valueKey="_id"
            loadingText="Loading Profiles..."
            loadingMoreText="Loading More Profiles..."
            emptyText="No Profiles Found"
            errorText="Unable to load profiles."
            retryButtonText="Retry"
          />
          {errors.selectedProfiles && (
            <span className={styles.error}>{errors.selectedProfiles}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Timezone</label>

          <Dropdown
            options={filteredTimezones}
            selected={formData.selectedTimezone}
            onChange={(value) => updateField("selectedTimezone", value)}
            search={timeZoneSearch}
            setSearch={setTimeZoneSearch}
            placeholder="Select timezone"
            searchPlaceHolderValue="Search Timezone..."
            loadingText="Loading Timezones..."
            emptyText="No Timezones Found"
            errorText="Unable to load timezones."
            retryButtonText="Retry"
            labelKey="label"
            valueKey="value"
          />

          {errors.selectedTimezone && (
            <span className={styles.error}>{errors.selectedTimezone}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <DateTimeInput
            label="Start Date & Time"
            date={formData.startDate}
            time={formData.startTime}
            onDateChange={(value) => updateField("startDate", value)}
            onTimeChange={(value) => updateField("startTime", value)}
          />

          {errors.startDate && (
            <span className={styles.error}>{errors.startDate}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <DateTimeInput
            label="End Date & Time"
            date={formData.endDate}
            time={formData.endTime}
            onDateChange={(value) => updateField("endDate", value)}
            onTimeChange={(value) => updateField("endTime", value)}
            minDate={formData.startDate}
          />

          {errors.endDate && (
            <span className={styles.error}>{errors.endDate}</span>
          )}
        </div>

        <Button
          variant="primary"
          className={styles.createBtn}
          onClick={submitEvent}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "+ Create Event"}
        </Button>
      </div>
    </Card>
  );
}

export default EventForm;
