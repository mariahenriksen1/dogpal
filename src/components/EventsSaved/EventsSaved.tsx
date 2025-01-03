import EventCard from "../EventCard/EventCard.tsx";
import {useSavedEvents} from "../../hooks/useSavedEvents.ts";
import styles from "./EventsSaved.module.css";
import {Event} from "../../Interface.ts";

function EventsSaved() {
  const {savedEvents, loading, error} = useSavedEvents();

  return (
    <section>
      <div className={styles.eventsSaved}>
        {loading && <p>Loading saved events...</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
        {!loading && savedEvents.length === 0 && <p>No saved events found.</p>}
        <div className={styles.events}>
          {savedEvents.map((event: Event) => (
            <div key={event.objectId}>
              <EventCard event={{...event, id: event.objectId}}/>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default EventsSaved;
