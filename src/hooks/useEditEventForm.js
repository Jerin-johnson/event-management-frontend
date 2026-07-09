import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { validateEvent } from "../validation/EventValidation";
import dayjs from "../utils/Day";
import { useSelector } from "react-redux";
import { updateEvent } from "../services/Event";
import { formatDateTime } from "../utils/Day";

const buildInitialState = (event, timezones) => {
  if (!event) {
    return {
      selectedProfiles: [],
      selectedTimezone: null,
      startDate: null,
      startTime: "09:00",
      endDate: null,
      endTime: "09:00",
    };
  }

  const tzObj =
    (timezones || []).find((t) => t.value === event.timezone) || null;
  const zone = event.timezone;

  const start = dayjs.utc(event.rawStartDateTime).tz(zone);
  const end = dayjs.utc(event.rawEndDateTime).tz(zone);

  return {
    selectedProfiles: event.profiles || [],
    selectedTimezone: tzObj,
    startDate: start.toDate(),
    startTime: start.format("HH:mm"),
    endDate: end.toDate(),
    endTime: end.format("HH:mm"),
  };
};

export default function useEditEventForm(event, onSave, timezones) {
  const [formData, setFormData] = useState(() =>
    buildInitialState(event, timezones),
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentProfile = useSelector((s) => s.userProfile.currentProfile);

  useEffect(() => {
    setFormData(buildInitialState(event, timezones));
    setErrors({});
  }, [event, timezones]);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const submitEvent = useCallback(async () => {
    const validationErrors = validateEvent(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const payload = {
      profiles: formData.selectedProfiles.map((p) => p._id),
      timezone: formData.selectedTimezone.value,
      startDateTime: formatDateTime(formData.startDate, formData.startTime),
      endDateTime: formatDateTime(formData.endDate, formData.endTime),
      changedBy: currentProfile?._id,
    };

    try {
      setIsSubmitting(true);

      const updated = await updateEvent(event.id, payload);

      await onSave(updated);

      toast.success("Event updated successfully!");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update event.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, event, onSave]);

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    submitEvent,
  };
}
