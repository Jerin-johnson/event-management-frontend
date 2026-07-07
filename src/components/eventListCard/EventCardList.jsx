import { Users, Calendar, Clock, Pencil, FileText } from "lucide-react";
import styles from "./EventCardList.module.css";

function EventCard({ event }) {
  return (
    <div className={styles.card}>
      <div className={styles.profiles}>
        <Users className={styles.usersIcon} />
        <span>{event.profiles.join(", ")}</span>
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
        <button className={styles.actionBtn}>
          <Pencil className={styles.actionIcon} />
          Edit
        </button>
        <button className={styles.actionBtn}>
          <FileText className={styles.actionIcon} />
          View Logs
        </button>
      </div>
    </div>
  );
}

export default EventCard;
