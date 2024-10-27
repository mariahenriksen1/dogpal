import React from "react";
import { Outlet, Link } from "react-router-dom";
import Logo from "../assets/Logo.tsx";
import Chat from "../assets/Chat.tsx";
import Profile from "../assets/Profile.tsx";
import Saved from "../assets/Saved.tsx";

const Layout: React.FC = () => {
  return (
    <>
      <div className="black-bg">
        <nav>
          <Link to="/" className="icon-fill">
            <Logo color="white" type={true} />
          </Link>
          <div className="links">
            <Link to="/calendar">Calendar</Link>
            <Link to="/createEvent">+ Create event</Link>
          </div>
          <div className="links">
            <Link to="/saved" className="icon-stroke">
              <Saved />
            </Link>
            <Link to="/chat" className="icon-stroke">
              <Chat />
            </Link>
            <Link to="/profile" className="icon-stroke">
              <Profile />
            </Link>
          </div>
        </nav>
      </div>
      <Outlet />
      {/* Placeholder for nested routes */}
    </>
  );
};

export default Layout;
