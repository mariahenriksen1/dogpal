import UserProfile from "../components/UserProfile.tsx";
import Notification from "../components/Notification.tsx";
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
        <div className="flex-row space-between">
          <h2>Upcoming events near you</h2>
          <Link to="/calendar">View all</Link>
        </div>
        <div className="flex-row gap-20">
          <img
            className="featured"
            src="/assets/event-1.png"
            alt="Highlight photo"
          />
        </div>
      </section>
    </>
  );
}

export default Home;
