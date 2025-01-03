import {useState} from "react";
import {useJoinEvent} from "../hooks/useJoinEvent";
import {useGetAttendees} from "../hooks/useGetAttendees";

const TestJoinEventShowAttendees = () => {
  const [eventId, setEventId] = useState<string>("");
  const {joinEvent, loading: joinLoading, error: joinError, success: joinSuccess} = useJoinEvent();
  const {attendees, loading: attendeesLoading, error: attendeesError} = useGetAttendees(eventId);

  const handleJoinEvent = () => {
    if (!eventId) {
      alert("Please enter an event ID");
      return;
    }
    joinEvent(eventId);
  };

  return (
    <div>
      <h1>Test Join Event and Show Attendees</h1>

      {/* Input for Event ID */}
      <div>
        <label htmlFor="eventId">Event ID:</label>
        <input
          id="eventId"
          type="text"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          placeholder="Enter Event ID"
        />
      </div>

      {/* Join Event Section */}
      <div>
        <h2>Join Event</h2>
        <button onClick={handleJoinEvent} disabled={joinLoading}>
          {joinLoading ? "Joining..." : "Join Event"}
        </button>
        {joinError && <p style={{color: "red"}}>{joinError}</p>}
        {joinSuccess && <p style={{color: "green"}}>{joinSuccess}</p>}
      </div>

      {/* Attendees Section */}
      <div>
        <h2>Event Attendees</h2>
        {attendeesLoading && <p>Loading attendees...</p>}
        {attendeesError && <p style={{color: "red"}}>{attendeesError}</p>}
        <ul>
          {!attendeesLoading &&
            attendees.map((attendee) => (
              <li key={attendee.id}>
                <p>
                  <strong>{attendee.firstName} {attendee.lastName}</strong> - {attendee.username}
                </p>
                <ul>
                  {attendee.dogAttendees.map((dog: any, index: number) => (
                    <li key={index} style={{marginBottom: "10px"}}>
                      <p><strong>Name:</strong> {dog.name || "Unknown"}</p>
                      <p><strong>Race:</strong> {dog.race || "Unknown"}</p>
                      <p>
                        <strong>Birth Date:</strong> {dog.dogBirthDate
                        ? new Date(dog.dogBirthDate).toLocaleDateString()
                        : "Unknown"}
                      </p>
                      {dog.dogPicture && dog.dogPicture !== "" ? (
                        <img
                          src={dog.dogPicture}
                          alt={`${dog.name}'s picture`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginTop: "5px",
                          }}
                        />
                      ) : (
                        <p>No picture available</p>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TestJoinEventShowAttendees;
