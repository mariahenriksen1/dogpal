import styles from "./EventsUpcoming.module.css";
import EventFeatured from "../EventFeatured/EventFeatured.tsx";
import EventCard from "../EventCard/EventCard.tsx";
import { IEvent } from "../../interfaces.ts";

const testEvent: IEvent = {
  id: "evt123",
  name: "Tech Conference 2023",
  description: "A conference showcasing the latest in tech innovations.",
  image:
    "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  location: "San Francisco, CA",
  date: "2023-11-20",
  price: 199.99,
  creator: "John Doe",
};

const events: IEvent[] = [testEvent, testEvent, testEvent, testEvent];

function EventsUpcoming() {
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
