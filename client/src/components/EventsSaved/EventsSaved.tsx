import EventCard from "../EventCard/EventCard.tsx";
import styles from "./EventsSaved.module.css";
import {Event} from "../../Interface.ts";

const testEvent: Event = {
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
const events: Event[] = [testEvent];

function EventsSaved() {
  return (
    <section>
      <div className={styles.eventsSaved}>
        <div className={styles.events}>
          {events.map((event, index) => (
            <div key={index}>
              <EventCard event={event}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventsSaved;
