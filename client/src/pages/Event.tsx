import useFetchEvent from "../hooks/useFetchEvent.ts";
import {useParams} from "react-router-dom";
import Button from "../components/Button/Button.tsx";
import "./Styling/StylingEvent.css";
import Information from "../components/Information/Information.tsx";
import styles from "../components/EventDetails/EventDetails.module.css";
import {FaEuroSign, FaMapMarkerAlt} from "react-icons/fa";
import Comments from "../components/Comments/Comments.tsx";

export default function Event() {
  const {id} = useParams(); // Get event ID from URL params
  const {event, loading} = useFetchEvent(id); // Use the custom hook

  if (loading) return (
    <header>
      <section>
        <div className="flex-column space-between">
          <div className="placeholder"/>
          <h1 className="color-white">Loading...</h1>
        </div>
      </section>
    </header>
  );

  if (!event) return <p>Event not found or failed to load.</p>;

  // Convert startTime and endTime into Date objects for formatting
  const startTimeHours = event.startTime ? Math.floor(event.startTime / 100) : 0;
  const startTimeMinutes = event.startTime ? event.startTime % 100 : 0;

  const endTimeHours = event.endTime ? Math.floor(event.endTime / 100) : 0;
  const endTimeMinutes = event.endTime ? event.endTime % 100 : 0;

  // Format times into 24-hour format
  const startTime = `${String(startTimeHours).padStart(2, "0")}:${String(
    startTimeMinutes
  ).padStart(2, "0")}`;

  const endTime = `${String(endTimeHours).padStart(2, "0")}:${String(
    endTimeMinutes
  ).padStart(2, "0")}`;

  // Format the date using the event.date field (assumed to be a timestamp in milliseconds)
  const eventDate = new Date(event.date);
  const dateMonth = eventDate
    .toLocaleString("default", {month: "short"})
    .toUpperCase();
  const dateDay = eventDate.getDate();

  return (
    <>
      <header>
        <section>
          <div className="flex-column space-between">
            <img src={event.image} alt={event.title}/>
            <div className="flex-row space-between align-center">
              <h1 className="color-white">{event.title}</h1>
              <div className="flex-row gap-20 align-center">
                <Information color="white" icon={<FaEuroSign color={"white"}/>} text={String(event.price)}/>
                <Button
                  label="Join event"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </section>
      </header>

      <section>
        <div className="flex-row gap-40">
          <div className="flex-column">
            <div className="flex-row gap-20">
              <div className="date">
                <div className={styles.date}>
                  <span className={styles.dateMonth}>{dateMonth}</span>
                  <span className={styles.dateDay}>{dateDay}</span>
                </div>
                <span>{startTime} - {endTime}</span>
              </div>
              <Information color="black" icon={<FaMapMarkerAlt/>} text={event.location}/>
            </div>
            <p className="subtitle">{event.description}</p>

            <Comments eventId={event.id}/>


            <div className="attendee">
              <h2>Attendees</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
/*
    <div className="description"></div>

    {/!* Comments Section *!/}
    <div className="comments">
      <h3 className="commenttitle">Comments</h3>
      {attendees.map((attendee) => (
        <div key={attendee.ID}>
          <p>{attendee.Name}</p>
          <p>{attendee.Dog}</p>
          <p>{attendee.Comments}</p>
          <Input
            label="Add Comment"
            variant="outlined"
            onChange={(e) => handleCommentChange(attendee.ID, e.target.value)}
          />
        </div>
      ))}
    </div>
  </>
);*/
