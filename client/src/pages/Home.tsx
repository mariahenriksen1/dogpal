import HeaderProfile from "../components/HeaderProfile/HeaderProfile.tsx";
import EventsUpcoming from "../components/EventsUpcoming/EventsUpcoming.tsx";
import EventsSaved from "../components/EventsSaved/EventsSaved.tsx";
import {Link} from "react-router-dom";
import Saved from "../assets/Saved.tsx";
import RequireAuth from "../components/Auth/RequireAuth.tsx";
import {useUser} from "../context/UserContext.tsx";

function Home() {

  useUser();

  return (
    <>
      <header>
        <section>
          <div className="flex-row space-between">
            <h1 className="color-white">Wuuf wuuf!</h1>
            <HeaderProfile/>
          </div>
        </section>
      </header>

      <main>
        <section>
          <div className="sectionHeader">
            <h2>Upcoming events near you</h2>
            <Link to="/calendar">View all</Link>
          </div>
          <EventsUpcoming/>
        </section>
        <RequireAuth>
          <section>
            <div className="sectionHeader">
              <div className="flex-row gap-10 align-center">
                <Saved/>
                <h2>Saved</h2>
              </div>
              <Link to="/saved">View all</Link>
            </div>
            <EventsSaved/>
          </section>
        </RequireAuth>
      </main>
    </>
  );
}

export default Home;
