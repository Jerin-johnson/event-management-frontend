import styles from "./UIStates.module.css";

function ErrorState({
  text = "Something went wrong.",
  onRetry,
  retryButtonText = "Retry",
}) {
  return (
    <div className={styles.stateContainer}>
      <p className={styles.message}>{text}</p>

      {onRetry && (
        <button type="button" className={styles.retryButton} onClick={onRetry}>
          {retryButtonText}
        </button>
      )}
    </div>
  );
}

export default ErrorState;
