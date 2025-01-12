import style from './Attendee.module.css';
import {IAttendee} from "../../Interface.ts";

export default function Attendee(attendee: IAttendee) {

  console.log(attendee)
  return (
    <div key={attendee.id} className={style.profile}>
      <div className={style.images}>
        <img className={style.profilePicture} src={attendee.profilePicture} alt={attendee.firstName}/>
      </div>
      <div className={style.user}>
        <p className={style.name}>{attendee.firstName + " " + attendee.lastName}</p>
        <div className={style.dogs}>
          {attendee.dogAttendees.map((dog: any, index: number) => (
            <div className={style.dog}>
              <img className={style.dogImage} src={dog.dogPicture} alt={dog.name}/>
              <p key={index}>{dog.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};