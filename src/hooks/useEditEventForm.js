import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { validateEvent } from "../validation/EventValidation";
import { TIMEZONES } from "../constants/TimeZone";

const buildInitialState = (event) => ({
  selectedProfiles: event?.profiles || [],
  selectedTimezone: event?.timezone || null,
  startDate: event?.startDate || null,
  startTime: event?.startTime || "09:00",
  endDate: event?.endDate || null,
  endTime: event?.endTime || "09:00",
});

export default function useEditEventForm(event, onSave) {
  const [formData, setFormData] = useState(() => buildInitialState(event));
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Re-sync whenever a different event is openedediting
  useEffect(() => {
    setFormData(buildInitialState(event));
    setErrors({});
  }, [event]);

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

    try {
      setIsSubmitting(true);

      await onSave({
        ...event,
        ...formData,
        updatedAt: new Date().toISOString(),
      });

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
    timezones: TIMEZONES,
    updateField,
    submitEvent,
  };
}
