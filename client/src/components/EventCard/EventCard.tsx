import EventDetails from "../EventDetails/EventDetails.tsx";
import styles from "./EventCard.module.css";
import { Link } from "react-router-dom";
import { Event } from "../../Interface.ts";

interface EventPreviewProps {
  event: Event;
}

function EventCard({ event }: EventPreviewProps) {
  return (
    <Link to={`/events/${event.id}`} className={styles.eventPreview}>
      <img src={event.coverImage} alt="Event image" />
      <EventDetails event={event} />
    </Link>
  );
}

export default EventCard;
