import { Users, Calendar, Clock, Pencil, FileText } from "lucide-react";
import styles from "./EventCardList.module.css";
import { useState } from "react";
import EditEventModal from "../editEventModal/EditEventModal";
import ViewLogsModal from "../viewEventLogModal/ViewEventLogModal";

function EventCard({ event, selectedTimezone, onUpdate }) {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isLogsOpen, setLogsOpen] = useState(false);

  console.log("the recice fef event", event);
  return (
    <div className={styles.card}>
      <div className={styles.profiles}>
        <Users className={styles.usersIcon} />
        <span>{event.profileNames.join(", ")}</span>
      </div>

      <div className={styles.dateRow}>
        <Calendar className={styles.calendarIcon} />
        <div>
          <div className={styles.dateLabel}>Start: {event.startDate}</div>
          <div className={styles.timeLabel}>
            <Clock className={styles.clockIcon} />
            {event.startTime}
          </div>
        </div>
      </div>

      <div className={styles.dateRow}>
        <Calendar className={styles.calendarIcon} />
        <div>
          <div className={styles.dateLabel}>End: {event.endDate}</div>
          <div className={styles.timeLabel}>
            <Clock className={styles.clockIcon} />
            {event.endTime}
          </div>
        </div>
      </div>

      <div className={styles.meta}>
        <div>Created: {event.createdAt}</div>
        <div>Updated: {event.updatedAt}</div>
      </div>

      <div className={styles.actions}>
        <button className={styles.actionBtn} onClick={() => setEditOpen(true)}>
          <Pencil className={styles.actionIcon} />
          Edit
        </button>
        <button className={styles.actionBtn} onClick={() => setLogsOpen(true)}>
          <FileText className={styles.actionIcon} />
          View Logs
        </button>
      </div>

      <EditEventModal
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        event={event}
        onSave={(updated) => {
          onUpdate(updated);
          setEditOpen(false);
        }}
      />

      <ViewLogsModal
        isOpen={isLogsOpen}
        eventId={event.id}
        onClose={() => setLogsOpen(false)}
        selectedTimezone={selectedTimezone}
      />
    </div>
  );
}

export default EventCard;
