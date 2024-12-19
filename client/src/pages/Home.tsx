import HeaderProfile from "../components/HeaderProfile/HeaderProfile.tsx";
import EventsUpcoming from "../components/EventsUpcoming/EventsUpcoming.tsx";
import EventsSaved from "../components/EventsSaved/EventsSaved.tsx";
import { Link } from "react-router-dom";
import Saved from "../assets/Saved.tsx";


function Home() {
  return (
    
    <>
      <header>
        <section>
          <div className="flex-row space-between">
            <h1 className="color-white">Wuuf wuuf!</h1>
            <HeaderProfile />

          </div>
        </section>
      </header>

      <main>
        <section>
          <div className="sectionHeader">
            <h2>Upcoming events near you</h2>
            <Link to="/calendar">View all</Link>
          </div>
          <EventsUpcoming />
        </section>
        <section>
          <div className="sectionHeader">
            <div className="flex-row gap-10 align-center">
              <Saved />
              <h2>Saved</h2>
            </div>
            <Link to="/saved">View all</Link>
          </div>
          <EventsSaved />
        </section>
      </main>
    </>
  );
}

export default Home;
