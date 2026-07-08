export function validateEvent(formData) {
  const errors = {};

  if (formData.selectedProfiles.length === 0) {
    errors.selectedProfiles = "Please select at least one profile.";
  }

  if (!formData.selectedTimezone) {
    errors.selectedTimezone = "Please select a timezone.";
  }

  if (!formData.startDate) {
    errors.startDate = "Please select a start date.";
  }

  if (!formData.endDate) {
    errors.endDate = "Please select an end date.";
  }

  if (formData.startDate && formData.endDate) {
    const start = new Date(`${formData.startDate}T${formData.startTime}`);

    const end = new Date(`${formData.endDate}T${formData.endTime}`);

    if (end <= start) {
      errors.endDate = "End date & time must be after start date & time.";
    }
  }

  return errors;
}
