import EventView from "./EventView.tsx";

function Notification() {
  return (
    <>
      <div className="notification flex-row space-between align-center">
        <p>
          <b>You’ve been invited to an event!</b>
        </p>
        <EventView />
      </div>
    </>
  );
}

export default Notification;
