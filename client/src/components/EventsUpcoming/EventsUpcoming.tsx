import styles from "./EventsUpcoming.module.css";
import EventFeatured from "../EventFeatured/EventFeatured.tsx";
import EventCard from "../EventCard/EventCard.tsx";

import {Event} from "../../Interface.ts";

const testEvent: Event = {
  id: "evt1123",
  title: "Tech Conference 2023",
  description: "A conference showcasing the latest in tech innovations.",
  image: "",
  location: "San Francisco, CA",
  date: "2023-11-20",
  price: 199.99,
  creator: "John Doe",
};

const events: Event[] = [
  {...testEvent, id: "evt1123-1"},
  {...testEvent, id: "evt1123-2"},
  {...testEvent, id: "evt1123-3"},
  {...testEvent, id: "evt1123-4"},
];

function EventsUpcoming() {
  return (
    <section>
      <div className={styles.eventsUpcoming}>
        <div className={styles.events}>
          {events.map((event, index) => {
            return index === 0 ? (
              <EventFeatured key={event.id} event={event}/>
            ) : (
              <EventCard key={event.id} event={event}/>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default EventsUpcoming;
