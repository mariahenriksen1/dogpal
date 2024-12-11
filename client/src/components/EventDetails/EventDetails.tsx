import ChevronRight from "../../assets/ChevronRight.tsx";
import IEvent from "../../interfaces.ts";
import styles from "./EventDetails.module.css";

interface EventDetailsProps {
  event: IEvent;
}

function EventDetails({ event }: EventDetailsProps) {
  return (
    <>
      <div className={styles.details}>
        <div className={styles.information}>
          <div className={styles.date}>
            <span className={styles.dateMonth}>SEP</span>
            <span className={styles.dateDay}>01</span>
          </div>
          <div className={styles.timeName}>
            <span>10:00 - 12:00</span>
            <span className={styles.name}>{event.name}</span>
          </div>
        </div>
        <ChevronRight />
      </div>
    </>
  );
}

export default EventDetails;
