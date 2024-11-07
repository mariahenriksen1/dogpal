import EventSmallTitle from "./EventSmallTitle.tsx";
import { Link } from "react-router-dom";

function EventPreview() {
  return (
    <Link to="/test" className="event-preview flex-column gap-10">
      <img src="/assets/event-1.png" alt="" />
      <EventSmallTitle />
    </Link>
  );
}

export default EventPreview;
