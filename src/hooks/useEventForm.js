import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { validateEvent } from "../validation/EventValidation";
import { formatDateTime } from "../utils/Day";
import { useSelector } from "react-redux";

const INITIAL_FORM = {
  profiles: [],
  selectedProfiles: [],
  selectedTimezone: null,
  startDate: null,
  startTime: "09:00",
  endDate: null,
  endTime: "09:00",
};

export default function useEventForm({ createEventMutation }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentProfile = useSelector(
    (state) => state.userProfile.currentProfile,
  );

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove error while typin/selecting
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  }, []);

  const addProfile = useCallback((name) => {
    const profile = {
      id: Date.now(),
      name,
    };

    setFormData((prev) => ({
      ...prev,
      profiles: [...prev.profiles, profile],
      selectedProfiles: [...prev.selectedProfiles, profile],
    }));

    setErrors((prev) => ({
      ...prev,
      selectedProfiles: "",
    }));

    toast.success("Profile added");
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM);
    setErrors({});
  }, []);

  const submitEvent = useCallback(async () => {
    const validationErrors = validateEvent(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      toast.error("Please fix the highlighted fields.");

      return;
    }

    console.log("what is current", currentProfile);

    if (!currentProfile) {
      toast.error("please select a profile");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        profiles: formData.selectedProfiles.map((profile) => profile._id),
        timezone: formData.selectedTimezone.value,
        startDateTime: formatDateTime(formData.startDate, formData.startTime),
        endDateTime: formatDateTime(formData.endDate, formData.endTime),
        createdBy: currentProfile._id,
      };

      console.log("the payload", payload);

      await createEventMutation(payload);

      console.log("Submitting Event:", formData, payload);
      toast.success("Event created successfully!");

      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create event.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, resetForm, currentProfile, createEventMutation]);

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    addProfile,
    submitEvent,
  };
}
