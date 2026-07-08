import { useMemo } from "react";
import { Clock } from "lucide-react";
import styles from "./ViewEventLogModal.module.css";
import Modal from "../modal/Modal";
import { useEventLogs } from "../../hooks/useEventLogs";
import dayjs from "../../utils/Day";

const FIELD_LABELS = {
  timezone: "Timezone",
  startDateTime: "Start Time",
  endDateTime: "End Time",
  profiles: "Participants",
};

function ViewLogsModal({ isOpen, onClose, eventId, selectedTimezone }) {
  const { data: logs = [], isLoading, error } = useEventLogs(eventId, isOpen);

  const formattedLogs = useMemo(() => {
    if (!selectedTimezone) return [];

    return logs.map((log) => {
      const changes = log.changedFields
        .filter((field) => field !== "changedBy")
        .map((field) => {
          let previous = log.previousValues?.[field];
          let current = log.newValues?.[field];

          if (field.includes("DateTime")) {
            previous = previous
              ? dayjs
                  .utc(previous)
                  .tz(selectedTimezone.value)
                  .format("DD MMM YYYY hh:mm A")
              : "-";

            current = current
              ? dayjs
                  .utc(current)
                  .tz(selectedTimezone.value)
                  .format("DD MMM YYYY hh:mm A")
              : "-";
          }

          if (field === "profiles") {
            previous = Array.isArray(previous) ? previous.join(", ") : "-";

            current = Array.isArray(current) ? current.join(", ") : "-";
          }

          return {
            label: FIELD_LABELS[field] || field,
            previous,
            current,
          };
        });

      return {
        id: log._id,
        updatedBy: log.changedBy?.name,
        updatedAt: dayjs
          .utc(log.createdAt)
          .tz(selectedTimezone.value)
          .format("DD MMM YYYY • hh:mm A"),
        changes,
      };
    });
  }, [logs, selectedTimezone]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Event Update History">
      {isLoading ? (
        <p className={styles.empty}>Loading history...</p>
      ) : error ? (
        <p className={styles.empty}>Unable to load history.</p>
      ) : formattedLogs.length === 0 ? (
        <p className={styles.empty}>No update history yet.</p>
      ) : (
        <div className={styles.logList}>
          {formattedLogs.map((log) => (
            <div key={log.id} className={styles.logItem}>
              <div className={styles.logHeader}>
                <div className={styles.timestamp}>
                  <Clock size={16} />

                  <span>{log.updatedAt}</span>
                </div>

                <div className={styles.updatedBy}>
                  Updated by <strong>{log.updatedBy}</strong>
                </div>
              </div>

              <div className={styles.divider} />

              {log.changes.map((change) => (
                <div key={change.label} className={styles.changeRow}>
                  <div className={styles.field}>{change.label}</div>

                  <div className={styles.values}>
                    <span className={styles.oldValue}>
                      {change.previous || "-"}
                    </span>

                    <span className={styles.arrow}>→</span>

                    <span className={styles.newValue}>
                      {change.current || "-"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

export default ViewLogsModal;
