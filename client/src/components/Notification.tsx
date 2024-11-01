import EventSmallTitle from "./EventSmallTitle.tsx";
import { Link } from "react-router-dom";

function Notification() {
  return (
    <section>
      <div className="notification flex-row space-between align-center">
        <p>
          <b>You’ve been invited to an event!</b>
        </p>
        <Link to={"/test"}>{<EventSmallTitle />}</Link>
      </div>
    </section>
  );
}

export default Notification;
