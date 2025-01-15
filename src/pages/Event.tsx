import React, { useEffect, useState } from "react";
import useFetchEvent from "../hooks/useFetchEvent.ts";
import { useParams } from "react-router-dom";
import Button from "../components/Button/Button.tsx";
import "./Styling/StylingEvent.css";
import Information from "../components/Information/Information.tsx";
import styles from "../components/EventDetails/EventDetails.module.css";
import { FaEuroSign, FaMapMarkerAlt } from "react-icons/fa";
import Comments from "../components/Comments/Comments.tsx";
import { useJoinEvent } from "../hooks/useJoinEvent.ts";
import Attendees from "../components/Attendees/Attendees.tsx";
import { useSaveEvent } from "../hooks/useSaveEvent.ts";
import RequireAuth from "../components/Auth/RequireAuth.tsx";
import { useSavedEvents } from "../hooks/useSavedEvents.ts";
import { useJoinedEvents } from "../hooks/useJoinedEvents.ts";

export default function Event() {
  const { id: eventId } = useParams();
  const { savedEvents, setSavedEvents } = useSavedEvents(); // Include setter for saved events
  const { joinedEvents } = useJoinedEvents();

  const { event, loading } = useFetchEvent(eventId);
  const { joinEvent, loading: joinLoading, success: joinSuccess } = useJoinEvent();
  const { saveEvent, loading: saveLoading, success: saveSuccess } = useSaveEvent();

  const [isSaved, setIsSaved] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [reloadAttendees, setReloadAttendees] = useState(0);

  useEffect(() => {
    console.log("Saved Events:", savedEvents);
    console.log("Event ID:", eventId);
    setIsSaved(savedEvents.some((savedEvent) => savedEvent.objectId === eventId));
    setIsJoined(joinedEvents.some((joinedEvent) => joinedEvent.id === eventId));
  }, [savedEvents, joinedEvents, eventId]);

  const handleSaveEvent = async () => {
    const response = await saveEvent(eventId);
    if (response.success) {
      setIsSaved(true);
      setSavedEvents((prev) => [...prev, { objectId: eventId }]); // Update saved events
    } else {
      console.error("Failed to save event.");
    }
  };

  const handleJoinEvent = async () => {
    if (eventId) {
      const response = await joinEvent(eventId);
      if (response.success) {
        setIsJoined(true);
        setReloadAttendees((prev) => prev + 1);
      } else {
        console.error("Failed to join event.");
      }
    }
  };

  if (loading)
    return (
      <header>
        <section>
          <div className="flex-column space-between">
            <div className="placeholder" />
            <h1 className="color-white">Loading...</h1>
          </div>
        </section>
      </header>
    );

  if (!event) return <p>Event not found or failed to load.</p>;

  const startTime = `${String(Math.floor(event.startTime / 100)).padStart(2, "0")}:${String(
    event.startTime % 100
  ).padStart(2, "0")}`;

  const endTime = `${String(Math.floor(event.endTime / 100)).padStart(2, "0")}:${String(
    event.endTime % 100
  ).padStart(2, "0")}`;

  const eventDate = new Date(event.date);
  const dateMonth = eventDate.toLocaleString("default", { month: "short" }).toUpperCase();
  const dateDay = eventDate.getDate();

  return (
    <>
      <header>
        <section>
          <div className="flex-column space-between">
            <img className="eventImage" src={event.image} alt={event.title} />
            <div className="flex-row space-between align-center">
              <h1 className="color-white">{event.title}</h1>
              <RequireAuth>
                <div className="flex-row gap-20 align-center">
                  <Information
                    color="white"
                    icon={<FaEuroSign color={"white"} />}
                    text={event.price ? String(event.price) : "Free"}
                  />
                  {isJoined ? (
                    <span className="joined">You have already joined this event</span>
                  ) : (
                    <Button
                      label={joinLoading ? "Joining..." : "Join Event"}
                      variant="primary"
                      onClick={handleJoinEvent}
                    />
                  )}
                  {isSaved ? (
                    <span className="saved">You have already saved this event</span>
                  ) : (
                    <Button
                      label={saveLoading ? "Saving..." : "Save Event"}
                      variant="secondary"
                      onClick={handleSaveEvent}
                    />
                  )}
                </div>
              </RequireAuth>
            </div>
          </div>
        </section>
      </header>

      <section>
        <div className="event">
          <div className="description">
            <div className="flex-row gap-20">
              <div className="date">
                <div className={styles.date}>
                  <span className={styles.dateMonth}>{dateMonth}</span>
                  <span className={styles.dateDay}>{dateDay}</span>
                </div>
                <span>
                  {startTime} - {endTime}
                </span>
              </div>
              <Information
                color="black"
                icon={<FaMapMarkerAlt />}
                text={event.location}
              />
            </div>
            <p className="subtitle">{event.description}</p>
            <Comments eventId={event.id} />
          </div>
          <Attendees key={reloadAttendees} eventId={event.id} />
        </div>
      </section>
    </>
  );
}
