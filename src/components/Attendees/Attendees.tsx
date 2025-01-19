import React, { useEffect, useState } from "react";
import styles from "./Attendees.module.css";
import { useGetAttendees } from "../../hooks/useGetAttendees.ts";
import Attendee from "../Attendee/Attendee.tsx";
import { IAttendee } from "../../Interface.ts";
import { Link } from "react-router-dom";

export default function Attendees({ eventId, reload }: { eventId: string; reload: number }) {
  const { attendees, loading: attendeesLoading, error: attendeesError, fetchAttendees } =
    useGetAttendees(eventId);

  const [localAttendees, setLocalAttendees] = useState<IAttendee[]>([]);

  // Update local attendees whenever fetchAttendees is called
  useEffect(() => {
    if (reload > 0) {
      fetchAttendees().then(() => setLocalAttendees(attendees));
    }
  }, [reload, fetchAttendees, attendees]);

  // Initial sync with fetched attendees
  useEffect(() => {
    setLocalAttendees(attendees);
  }, [attendees]);

  return (
    <div className={styles.container}>
      <h2>Attendees</h2>
      <div className={styles.attendees}>
        {attendeesLoading && <p>Loading attendees...</p>}
        {attendeesError && <p style={{ color: "red" }}>{attendeesError}</p>}
        {!attendeesLoading &&
          localAttendees.map((attendee: IAttendee) => (
            <Link to={`/user/${attendee.id}`} key={attendee.id}>
              <Attendee {...attendee} />
            </Link>
          ))}
        {!attendeesLoading && localAttendees.length === 0 && <p>No attendees yet.</p>}
      </div>
    </div>
  );
}
