import DatePicker from "../datePicker/DatePicker";
import TimeInput from "../timePicker/TimeInput";
import styles from "./DateTimeInput.module.css";

function DateTimeInput({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
  minDate,
  maxDate,
}) {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.dateTimeRow}>
        <DatePicker
          value={date}
          onChange={onDateChange}
          minDate={minDate}
          maxDate={maxDate}
        />
        <TimeInput value={time} onChange={onTimeChange} />
      </div>
    </div>
  );
}

export default DateTimeInput;
