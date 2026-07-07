import { Clock } from "lucide-react";
import styles from "./ViewEventLogModal.module.css";
import Modal from "../modal/Modal";

function ViewLogsModal({ isOpen, onClose, logs = [] }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Event Update History">
      {logs.length === 0 ? (
        <p className={styles.empty}>No update history yet</p>
      ) : (
        <div className={styles.logList}>
          {logs.map((log, index) => (
            <div key={index} className={styles.logItem}>
              <div className={styles.timestamp}>
                <Clock className={styles.clockIcon} />
                {log.timestamp}
              </div>
              <div className={styles.message}>{log.message}</div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

export default ViewLogsModal;
