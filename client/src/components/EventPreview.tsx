import EventView from "./EventView.tsx";

function EventPreview() {
  return (
    <div className="event flex-column gap-10">
      <img src="/assets/event-1.png" alt="" />
      <EventView />
    </div>
  );
}

export default EventPreview;
