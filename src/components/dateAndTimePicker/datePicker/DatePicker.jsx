import ReactDatePicker from "react-datepicker";
import { CalendarIcon } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePicker.module.css";

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  minDate,
  maxDate,
}) {
  return (
    <div className={styles.container}>
      <CalendarIcon className={styles.icon} />
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat="MMMM do, yyyy"
        placeholderText={placeholder}
        className={styles.input}
        calendarClassName={styles.calendar}
        popperClassName={styles.popper}
      />
    </div>
  );
}

export default DatePicker;
