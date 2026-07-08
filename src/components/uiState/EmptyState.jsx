import styles from "./UIStates.module.css";

function EmptyState({ text = "No data found." }) {
  return (
    <div className={styles.stateContainer}>
      <p className={styles.message}>{text}</p>
    </div>
  );
}

export default EmptyState;
