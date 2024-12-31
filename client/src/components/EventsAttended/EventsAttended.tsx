import EventCard from "../EventCard/EventCard.tsx";
import styles from "./EventsAttended.module.css";
import {Event} from "../../Interface.ts";

const testEvent: Event = {
  id: "evt1234",
  name: "Tech Conference 2023",
  description: "A conference showcasing the latest in tech innovations.",
  image:
    "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  location: "San Francisco, CA",
  date: "2023-11-20",
  price: 199.99,
  creator: "John Doe",
};

const testEvent2: Event = {
  id: "evt12345",
  name: "Dog Playdate Week 51 2024",
  description: "The weekly dog playdate event for all dog lovers",
  image:
    "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  location: "Copehagen, Denmark",
  date: "2024-12-20",
  price: 55.99,
  creator: "Freja Sunesen",
};
const events: Event[] = [testEvent, testEvent2];

function EventsAttended() {
  return (
    <section>
      <div className={styles.eventsAttended}>
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

export default EventsAttended;
