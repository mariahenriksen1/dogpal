import { Link } from "react-router-dom";
import FeaturedEvent from "./FeaturedEvent.tsx";
import EventPreview from "./EventPreview.tsx";

function UpcomingEvents() {
  return (
    <section>
      <div className="flex-column gap-20">
        <div className="flex-row space-between">
          <h2>Upcoming events near you</h2>
          <Link to="/calendar">View all</Link>
        </div>
        <div className="flex-column gap-40">
          <FeaturedEvent />
          <div className="flex-wrap gap-40">
            <EventPreview />
            <EventPreview />
            <EventPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
