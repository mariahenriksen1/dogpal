import Saved from "../assets/Saved.tsx";
import { Link } from "react-router-dom";
import EventPreview from "./EventPreview.tsx";

function SavedEvents() {
  return (
    <section>
      <div className="flex-column gap-20">
        <div className="flex-row space-between">
          <div className="flex-row gap-10 align-center">
            <Saved />
            <h2>Saved</h2>
          </div>
          <Link to="/saved">View all</Link>
        </div>
        <div className="flex-wrap gap-40">
          <EventPreview />
          <EventPreview />
        </div>
      </div>
    </section>
  );
}

export default SavedEvents;
