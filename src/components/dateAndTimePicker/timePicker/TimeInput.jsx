import { ClockIcon } from "lucide-react";
import styles from "./TimeInput.module.css";

function TimeInput({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <input
        type="time"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default TimeInput;
