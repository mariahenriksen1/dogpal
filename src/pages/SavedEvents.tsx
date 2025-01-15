import React from "react";
import { useSavedEvents } from "../hooks/useSavedEvents.ts";
import "./Styling/StylingCalendar.css";
import EventsSaved from "../components/EventsSaved/EventsSaved.tsx";

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
      <EventsSaved/>
    </>
    
  );
};

export default SavedEvents;
