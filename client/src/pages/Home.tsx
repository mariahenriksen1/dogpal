import UserProfile from "../components/UserProfile.tsx";
import Notification from "../components/Notification.tsx";
import Featured from "../components/Featured.tsx";
import EventPreview from "../components/EventPreview.tsx";
import Saved from "../assets/Saved.tsx";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <header>
        <section>
          <div className="flex-row space-between">
            <h1 className="color-white">Wuuf wuuf!</h1>
            <UserProfile />
          </div>
        </section>
      </header>

      <section>
        <Notification />
      </section>
      <section className="gap-20">
        <div className="flex-column gap-20">
          <div className="flex-row space-between">
            <h2>Upcoming events near you</h2>
            <Link to="/calendar">View all</Link>
          </div>
          <Featured />
          <div className="flex-wrap gap-40">
            <EventPreview />
            <EventPreview />
            <EventPreview />
          </div>
        </div>
      </section>

      <section>
        <div className="flex-column gap-20">
          <div className="flex-row space-between">
            <div className="flex-row gap-10 align-center">
              <Saved />
              <h2>Saved</h2>
            </div>
            <Link to="/saved">View all</Link>
          </div>
          <div className="flex-wrap gap-40">
            <EventPreview />
            <EventPreview />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
