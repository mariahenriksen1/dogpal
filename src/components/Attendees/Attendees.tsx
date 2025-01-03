import styles from "./Attendees.module.css";
import {useGetAttendees} from "../../hooks/useGetAttendees.ts";
import Attendee from "../Attendee/Attendee.tsx";
import {IAttendee} from "../../Interface.ts";


export default function Attendees({eventId}: { eventId: string }) {
  const {attendees, loading: attendeesLoading, error: attendeesError} = useGetAttendees(eventId);

  return (
    <div className={styles.container}>
      <h2>Attendees</h2>
      <div className={styles.attendees}>
        {attendeesLoading && <p>Loading attendees...</p>}
        {attendeesError && <p style={{color: "red"}}>{attendeesError}</p>}
        {!attendeesLoading &&
          attendees.map((attendee: IAttendee) => (
            <Attendee {...attendee} key={attendee.id}/>
          ))}
      </div>
    </div>
  )
};