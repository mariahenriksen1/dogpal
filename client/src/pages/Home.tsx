import HeaderProfile from "../components/HeaderProfile/HeaderProfile.tsx";
import EventsUpcoming from "../components/EventsUpcoming/EventsUpcoming.tsx";
import EventsSaved from "../components/EventsSaved/EventsSaved.tsx";
import { Link } from "react-router-dom";
import Saved from "../assets/Saved.tsx";
import { useState } from "react";
import LogoutButton from "../components/LogoutButton/LogoutButton.tsx";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login state

  // This function will be called after logout to update the state
  const handleLogoutSuccess = () => {
    setIsLoggedIn(false); // Set to false to hide profile section
  };

  return (
    <>
      <header>
        <section>
          <div className="flex-row space-between">
            <h1 className="color-white">Wuuf wuuf!</h1>
            {/* Conditionally render HeaderProfile based on login state */}
            {isLoggedIn && <HeaderProfile />}
          </div>
        </section>
      </header>
      {/* Add LogoutButton outside of flex container */}
      {isLoggedIn && <LogoutButton onLogoutSuccess={handleLogoutSuccess} />}

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
