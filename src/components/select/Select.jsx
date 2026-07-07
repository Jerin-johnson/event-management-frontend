import styles from "./Select.module.css";
import { ChevronsUpDown } from "lucide-react";

function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  error,
}) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.selectWrapper}>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={styles.select}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronsUpDown className={styles.icon_ChevronsUpDown} />
      </div>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default Select;
