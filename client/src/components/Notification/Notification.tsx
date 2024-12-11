import EventDetails from "../EventDetails/EventDetails.tsx";
import { Link } from "react-router-dom";
import { IEvent } from "../../interfaces.ts";
import styles from "./Notification.module.css";

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

function Notification() {
  return (
    <section>
      <div className={styles.notification}>
        <p>
          <b>You’ve been invited to an event!</b>
        </p>
        <Link to={"/test"}>{<EventDetails event={testEvent} />}</Link>
      </div>
    </section>
  );
}

export default Notification;
