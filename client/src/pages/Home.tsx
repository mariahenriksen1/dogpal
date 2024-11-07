import UserProfile from "../components/UserProfile.tsx";
import Notification from "../components/Notification.tsx";
import UpcomingEvents from "../components/UpcomingEvents.tsx";
import SavedEvents from "../components/SavedEvents.tsx";

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

      <Notification />
      <UpcomingEvents />
      <SavedEvents />
    </>
  );
}

export default Home;
