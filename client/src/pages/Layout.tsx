import React from "react";
import { Outlet, Link } from "react-router-dom";
import Logo from "../assets/Logo.tsx";
import Profile from "../assets/Profile.tsx";
import Saved from "../assets/Saved.tsx";
import LogoutButton from "../components/LogoutButton/LogoutButton.tsx";
import Button from "../components/Button/Button.tsx";

const Layout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true); // Manage login state globally

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false); 
  };

  return (
    <>
      <div className="black-bg">
        <nav>
          <Link to="/" className="icon-fill">
            <Logo color="white" type={true} />
          </Link>
          <div className="links">
            <Link to="/createEvent">+ Create event</Link>
          </div>
          <div className="links">
            <Link to="/saved" className="icon-stroke">
              <Saved />
            </Link>
            <Link to="/profile" className="icon-stroke">
              <Profile />
            </Link>

            {/* Show Sign Up and Login buttons if not logged in */}
            {!isLoggedIn && (
              <>
                <Link to="/createUser" className="icon-stroke">
                  <Button
                    label="Sign Up"
                    variant="primary"
                    onClick={() => {}}
                    className="sign-up-button"
                  />
                </Link>
                <Link to="/login" className="icon-stroke">
                  <Button
                    label="Login"
                    variant="primary"
                    onClick={() => {}}
                    className="sign-up-button"
                  />
                </Link>
              </>
            )}

            {/* Show LogoutButton if logged in */}
            {isLoggedIn && (
              <LogoutButton onLogoutSuccess={handleLogoutSuccess} />
            )}
          </div>
        </nav>
      </div>
      <Outlet /> {/* This renders the child routes */}
      <footer style={{ height: "100px" }}></footer>
    </>
  );
};

export default Layout;
