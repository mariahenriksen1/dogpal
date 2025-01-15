import { useFetchEvents } from "../../hooks/useFetchEvents.ts";
import EventFeatured from "../EventFeatured/EventFeatured.tsx";
import EventCard from "../EventCard/EventCard.tsx";
import styles from "./EventsUpcoming.module.css";

function EventsUpcoming() {
  const { events, loading, error } = useFetchEvents();

  if (loading) {
    return <p>Loading upcoming events...</p>;
  }

  if (error) {
    return <p>Error loading events: {error}</p>;
  }

  if (events.length === 0) {
    return <p>No upcoming events available.</p>;
  }

  // Limit events to a maximum of 7
  const limitedEvents = events.slice(0, 7);

  return (
    <section>
      <div className={styles.eventsUpcoming}>
        <div className={styles.events}>
          {limitedEvents.map((event, index) => {
            return index === 0 ? (
              <EventFeatured
                key={event.id}
                event={{
                  ...event,
                  objectId: event.id,
                  startTime: event.startTime.toString(),
                  endTime: event.endTime.toString(),
                  creatorId: event.creator,
                }}
              />
            ) : (
              <EventCard
                key={event.id}
                event={{
                  ...event,
                  objectId: event.id,
                  startTime: event.startTime.toString(),
                  endTime: event.endTime.toString(),
                  creatorId: event.creator,
                  createdAt: event.createdAt,
                  updatedAt: event.updatedAt,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default EventsUpcoming;
