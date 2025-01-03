import EventDetails from "../EventDetails/EventDetails.tsx";
import {Link} from "react-router-dom";
import styles from "./Notification.module.css";
import {Event} from "../../Interface.ts"

function Notification(event: Event) {
  return (
    <section>
      <div className={styles.notification}>
        <p>
          <b>You’ve been invited to an event!</b>
        </p>
        <Link to={"/test"}>{<EventDetails event={event}/>}</Link>
      </div>
    </section>
  );
}

export default Notification;
