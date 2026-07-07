import styles from "./DateTimeInput.module.css";

function DateTimeInput({ label, ...props }) {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.dateTimeRow}>
        <input type="date" className={styles.input} {...props} />
        <input
          type="time"
          className={styles.input}
          defaultValue="09:00"
          {...props}
        />
      </div>
    </div>
  );
}

export default DateTimeInput;
