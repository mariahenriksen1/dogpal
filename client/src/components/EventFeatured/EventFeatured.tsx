import { Link } from "react-router-dom";
import styles from "./EventFeatured.module.css";
import Information from "../Information/Information.tsx";
import { IEvent } from "../../interfaces.ts";
import { FaEuroSign, FaUser } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

interface EventFeaturedProps {
  event: IEvent;
}

function EventFeatured({ event }: EventFeaturedProps) {
  return (
    <Link to="/test" className={styles.featured}>
      <div className={styles.graphic}>
        <img src={event.image} alt="Event photo" />
        <div className={styles.overlay}>
          <h1 className="color-white">{event.name}</h1>
          <div className={styles.information}>
            <Information
              icon={<FaLocationPin color={"white"} />}
              text={event.location}
              color="white"
            />
            <Information text={event.date} color="white" />
          </div>
        </div>
      </div>
      <div
        style={{ maxWidth: "400px" }}
        className="flex-column gap-10 align-baseline"
      >
        <div className="featured-information flex-row gap-20">
          <Information
            icon={<FaEuroSign color={"black"} />}
            text={String(event.price)}
            color="black"
          />
          <Information icon={<FaUser />} text={event.creator} color="black" />
        </div>
        <p>{event.description}</p>
      </div>
    </Link>
  );
}

export default EventFeatured;
