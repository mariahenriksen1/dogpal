import React from "react";
import { Outlet, Link } from "react-router-dom";
import Logo from "../assets/Logo.tsx";
import Profile from "../assets/Profile.tsx";
import Saved from "../assets/Saved.tsx";
import LogoutButton from "../components/LogoutButton/LogoutButton.tsx";
import Button from "../components/Button/Button.tsx";

const Layout: React.FC = () => {
  function handleSignUpClick(): void {
    throw new Error("Function not implemented.");
  }

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

            <Link to="/createUser" className="icon-stroke">
            <Button 
              label="Sign Up"
              variant="primary"
              onClick={handleSignUpClick}
              className="sign-up-button"
            />
            </Link>
             <Link to="/login" className="icon-stroke">
            <Button 
              label="Login"
              variant="primary"
              onClick={handleSignUpClick}
              className="sign-up-button"
            />
            </Link>
            <LogoutButton />
          </div>
        </nav>
      </div>
      <Outlet />
      {/* Placeholder for nested routes */}
      <footer style={{ height: "100px" }}></footer>
    </>
  );
};

export default Layout;
