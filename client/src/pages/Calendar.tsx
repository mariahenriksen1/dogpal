import React, { useState, useEffect } from "react";
import { useFetchEvents } from "../hooks/useFetchEvents";
import EventCard from "../components/EventCard/EventCard";
import "./Styling/StylingCalendar.css";

const Calendar: React.FC = () => {
  const { events, loading, error } = useFetchEvents();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Updated Selected Location:", selectedLocation);
  }, [selectedLocation]);

  const handleSort = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const handleLocationFilter = (location: string) => {
    console.log("Dropdown item clicked:", location);
    setSelectedLocation(location.trim());
    console.log("Location passed to setState:", location.trim());
    setIsOpen(false);
  };
// the dropdown only works if there is a timeout, IDK why
  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100); // Allow click to register
  };

  const uniqueLocations = events.length > 0
    ? Array.from(new Set(events.map((event) => event.location).filter(Boolean)))
    : [];
  console.log("Unique Locations (filtered):", uniqueLocations);

  const filteredEvents = events.filter((event) => {
    console.log("Selected Location:", selectedLocation);
    console.log("Event Location:", event.location);
    return selectedLocation ? event.location === selectedLocation : true;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p className="calendar-error">Error: {error}</p>;
  }

  return (
    <>
      <header className="calendar-header">
        <h1 className="calendar-title">Calendar</h1>
      </header>
      <div className="calendar-container">
        <p className="calendar-description">
          Explore upcoming dog events such as training sessions, social meetups, and other exciting activities in your area. Use the filters to search for events in specific locations or to find a date that suits you.
          <br />
          Don’t miss out on the next social event for you and your furry friend!
        </p>
        <div className="calendar-controls">
          <div className="calendar-sort">
            <span>Sort by:</span>
            <span
              className={`sort-option ${
                sortOrder === "desc" ? "sort-option-active" : ""
              }`}
              onClick={() => handleSort("desc")}
            >
              Descending date
            </span>
            <span
              className={`sort-option ${
                sortOrder === "asc" ? "sort-option-active" : ""
              }`}
              onClick={() => handleSort("asc")}
            >
              Ascending date
            </span>
          </div>
          <div className="calendar-filters">
            <span>Filter:</span>
            <div
              className="control-select-container"
              onBlur={handleBlur}
            >
              <div
                className="dropdown-header"
                onClick={() => setIsOpen((prev) => !prev)}
                tabIndex={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                {selectedLocation || "Choose location"}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 14 15" fill="none">
  <path d="M11.0832 5.75L6.99984 9.83333L2.9165 5.75" stroke="#19191A" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </div>
              {isOpen && (
                <ul className="dropdown-list">
                  <li
                    className="dropdown-item"
                    onClick={() => handleLocationFilter("")}
                  >
                    Choose location
                  </li>
                  {uniqueLocations.map((location) => (
                    <li
                      key={location}
                      className="dropdown-item"
                      onClick={() => handleLocationFilter(location || "")}
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <main className="calendar-events">
          {sortedEvents.length === 0 ? (
            <p className="calendar-no-events">No events found.</p>
          ) : (
            <div className="events-grid">
              {sortedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={{
                    ...event,
                    date: new Date(event.date).getTime(),
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

export default Calendar;
