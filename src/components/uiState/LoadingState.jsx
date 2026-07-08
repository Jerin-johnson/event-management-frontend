import styles from "./UIStates.module.css";

function LoadingState({ text = "Loading..." }) {
  return (
    <div className={styles.stateContainer}>
      <p className={styles.message}>{text}</p>
    </div>
  );
}

export default LoadingState;
