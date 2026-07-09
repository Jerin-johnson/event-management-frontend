import { useRef } from "react";
import { ClockIcon } from "lucide-react";
import styles from "./TimeInput.module.css";

function TimeInput({ value, onChange }) {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    const input = inputRef.current;
    if (!input) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      <ClockIcon className={styles.icon} onClick={handleIconClick} />
      <input
        ref={inputRef}
        type="time"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default TimeInput;
