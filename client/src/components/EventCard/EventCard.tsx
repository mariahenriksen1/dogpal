import EventDetails from "../EventDetails/EventDetails.tsx";
import styles from "./EventCard.module.css";
import { Link } from "react-router-dom";
import IEvent from "../../interfaces.ts";

interface EventPreviewProps {
  event: IEvent;
}

function EventCard({ event }: EventPreviewProps) {
  return (
    <Link to="/test" className={styles.eventPreview}>
      <img src={event.image} alt="Event image" />
      <EventDetails event={event} />
    </Link>
  );
}

export default EventCard;
