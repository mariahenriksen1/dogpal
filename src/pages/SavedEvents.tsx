import React from "react";
import { useSavedEvents } from "../hooks/useSavedEvents"; 
import EventCard from "../components/EventCard/EventCard";
import "./Styling/StylingCalendar.css";

const SavedEvents: React.FC = () => {
  const { savedEvents, loading, error } = useSavedEvents(); 

  if (loading) {
    return <p>Loading saved events...</p>;
  }

  if (error) {
    return <p className="calendar-error">Error: {error}</p>;
  }

  return (
    <>
      <header className="calendar-header">
        <h1 className="calendar-title">Saved Events</h1>
      </header>
      <div className="calendar-container">
        <p className="calendar-description">
        </p>
        <main className="calendar-events">
          {savedEvents.length === 0 ? (
            <p className="calendar-no-events">No saved events found.</p>
          ) : (
            <div className="events-grid">
              {savedEvents.map((event) => (
                <EventCard
                  key={event.objectId}
                  event={{
                    ...event,
                    date: new Date(event.date),
                  }}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default SavedEvents;
