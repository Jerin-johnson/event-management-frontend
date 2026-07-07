import styles from "./Input.module.css";

function Input({ label, error, className = "", ...props }) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={props.id || props.name} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={props.id || props.name}
        className={`${styles.input} ${className}`}
        {...props}
      />

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default Input;
