import React from "react";
import { useFetchEvents } from "../../hooks/useFetchEvents";
import EventFeatured from "../EventFeatured/EventFeatured.tsx";
import EventCard from "../EventCard/EventCard.tsx";
import styles from "./EventsUpcoming.module.css";

function EventsUpcoming() {
  const { events, loading, error } = useFetchEvents();

  if (loading) {
    return <p>Loading upcoming events...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error loading events: {error}</p>;
  }

  if (events.length === 0) {
    return <p className={styles.noEvents}>No upcoming events available.</p>;
  }

  return (
    <section>
      <div className={styles.eventsUpcoming}>
        <div className={styles.events}>
          {events.map((event, index) => {
            return index === 0 ? (
              <EventFeatured key={event.id} event={event} />
            ) : (
              <EventCard key={event.id} event={event} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default EventsUpcoming;
