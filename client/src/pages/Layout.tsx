import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/event">Event</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/createEvent">Create Event</Link>
      </nav>
      <Outlet /> {/* Placeholder for nested routes */}
    </div>
  );
};

export default Layout;
