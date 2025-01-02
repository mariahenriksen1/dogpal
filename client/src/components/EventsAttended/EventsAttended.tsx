import React from "react";
import EventCard from "../EventCard/EventCard.tsx";
import { IEvent } from "../../interfaces.ts";
import { useJoinedEvents } from "../../hooks/useJoinedEvents";
import styles from "./EventsAttended.module.css";

function EventsAttended() {
  const { joinedEvents, loading, error } = useJoinedEvents();

  return (
    <section>

      <div className={styles.eventsAttended}>
        {loading && <p>Loading joined events...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!loading && !error && joinedEvents.length === 0 && (
          <p>No events joined yet. Go join some amazing events!</p>
        )}
        <div className={styles.events}>
          {joinedEvents.map((event) => (
            <div key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventsAttended;
