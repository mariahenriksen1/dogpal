import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Logo from "../assets/Logo.tsx";
import Profile from "../assets/Profile.tsx";
import Saved from "../assets/Saved.tsx";
import Button from "../components/Button/Button.tsx";
import Parse from "../env.Backend/env.parseConfig.ts";
import { toast } from "react-toastify";
import RequireUnauth from "../components/Auth/RequireUnauth.tsx";
import RequireAuth from "../components/Auth/RequireAuth.tsx";

const Layout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Parse.User.current() !== null);

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      setIsLoggedIn(false); // Updates the local state
      toast.success("Successfully logged out!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error during logout: ${error.message}`);
      }
    }
  };

  return (
    <>
      <div className="black-bg">
        <nav>
          <Link to="/" className="icon-fill">
            <Logo color="white" type={true} />
          </Link>
          <RequireAuth>
            <div className="links">
              <Link to="/createEvent">+ Create event</Link>
            </div>
          </RequireAuth>

          <div className="links">
            <RequireAuth>
              <Link to="/saved" className="icon-stroke">
                <Saved />
              </Link>
              <Link to="/profile" className="icon-stroke">
                <Profile />
              </Link>
            </RequireAuth>

            <RequireUnauth>
              <Link to="/createUser" className="icon-stroke">
                <Button
                  label="Sign Up"
                  variant="transparent"
                  className="shrink"
                />
              </Link>
              <Link to="/login" className="icon-stroke">
                <Button label="Login" variant="primary" className="shrink" />
              </Link>
            </RequireUnauth>

            <RequireAuth>
              <Button label="Logout" variant="secondary" onClick={handleLogout} />
            </RequireAuth>
          </div>
        </nav>
      </div>
      <Outlet /> {/* This renders the child routes */}
      <footer style={{ height: "100px" }}></footer>
    </>
  );
};

export default Layout;
