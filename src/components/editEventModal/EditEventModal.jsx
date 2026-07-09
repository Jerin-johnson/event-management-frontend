import Modal from "../modal/Modal";
import Button from "../button/Button";
import DateTimeInput from "../dateAndTimePicker/dataTimePicker/DateTimeInput";
import styles from "./EditEventModal.module.css";
import Dropdown from "../DropdownSelect/DropdownSelector";
import useEditEventForm from "../../hooks/useEditEventForm";
import { useProfileSelector } from "../../hooks/useProfileSelector";
import { useTimeZones } from "../../hooks/useGetTimeZone";
import { useTimezoneSelector } from "../../hooks/useTimezoneSelector";

function EditEventModal({ isOpen, onClose, event, onSave }) {
  const {
    filteredTimezones,
    timezones,
    search: timeZoneSearch,
    setSearch: setTimeZoneSearch,
  } = useTimezoneSelector();

  const { formData, errors, isSubmitting, updateField, submitEvent } =
    useEditEventForm(event, onSave, timezones);

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Event"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={submitEvent}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Event"}
          </Button>
        </>
      }
    >
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
          dropdownClassName={styles.profileDropdownPanel}
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
          options={timezones}
          selected={formData.selectedTimezone}
          placeholder="Select timezone"
          isMulti={false}
          labelKey="label"
          valueKey="value"
          dropdownClassName={styles.profileDropdownPanel}
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
    </Modal>
  );
}

export default EditEventModal;
