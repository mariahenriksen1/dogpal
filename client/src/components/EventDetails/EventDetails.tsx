import ChevronRight from "../../assets/ChevronRight.tsx";
import { IEvent } from "../../interfaces.ts";
import styles from "./EventDetails.module.css";

interface EventDetailsProps {
  event: IEvent;
}

function EventDetails({ event }: EventDetailsProps) {
  // Convert startTime and endTime into Date objects for formatting
  const startTimeHours = event.startTime ? Math.floor(event.startTime / 100) : 0;
  const startTimeMinutes = event.startTime ? event.startTime % 100 : 0;

  const endTimeHours = event.endTime ? Math.floor(event.endTime / 100) : 0;
  const endTimeMinutes = event.endTime ? event.endTime % 100 : 0;

  // Format times into 24-hour format
  const startTime = `${String(startTimeHours).padStart(2, "0")}:${String(
    startTimeMinutes
  ).padStart(2, "0")}`;

  const endTime = `${String(endTimeHours).padStart(2, "0")}:${String(
    endTimeMinutes
  ).padStart(2, "0")}`;

  // Format the date using the event.date field (assumed to be a timestamp in milliseconds)
  const eventDate = new Date(event.date);
  const dateMonth = eventDate
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const dateDay = eventDate.getDate();

  return (
    <>
      <div className={styles.details}>
        <div className={styles.information}>
          <div className={styles.date}>
            <span className={styles.dateMonth}>{dateMonth}</span>
            <span className={styles.dateDay}>{dateDay}</span>
          </div>
          <div className={styles.timeName}>
            <span>
              {startTime} - {endTime}
            </span>
            <span className={styles.name}>{event.title}</span>
          </div>
        </div>
        <ChevronRight />
      </div>
    </>
  );
}

export default EventDetails;
