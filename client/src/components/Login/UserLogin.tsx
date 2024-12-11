import { useState, FC, ReactElement, useEffect } from "react";
import { Divider, Input } from "@mui/material";
import Parse from "../../env.Backend/env.parseConfig";
import Button from "../Button/Button";

export const UserLogin: FC<{}> = (): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<Parse.Object | null>(null);
  const [userDetails, setUserDetails] = useState<{ firstName: string; lastName: string } | null>(null);

  const getCurrentUser = async function (): Promise<void> {
    const user: Parse.User | null = await Parse.User.current();
    setCurrentUser(user);

    if (user) {
      const firstName = user.get("FirstName") || "N/A";
      const lastName = user.get("LastName") || "N/A";
      setUserDetails({ firstName, lastName });
    } else {
      setUserDetails(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const doUserLogIn = async function () {
    try {
      const loggedInUser = await Parse.User.logIn(username, password);
      alert(`Success! User ${loggedInUser.get("username")} has successfully signed in!`);
      await getCurrentUser();
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      alert("Successfully logged out!");
      setCurrentUser(null);
      setUserDetails(null);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      {currentUser === null ? (
        <div className="container">
          <h2 className="heading">User Login</h2>
          <Divider />
          <div className="form_wrapper">
            <Input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              size="medium"
              className="form_input"
            />
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              size="medium"
              type="password"
              className="form_input"
            />
          </div>
          <div className="form_buttons">
            <Button label="Log In" variant="primary" onClick={doUserLogIn} />
          </div>
        </div>
      ) : (
        <div className="container">
          <h2 className="heading">{`Hello, ${currentUser.get("username")}!`}</h2>
          {userDetails && (
            <div>
              <p>{`First Name: ${userDetails.firstName}`}</p>
              <p>{`Last Name: ${userDetails.lastName}`}</p>
            </div>
          )}
          <Divider />
          <div className="form_buttons">
            <Button label="Log Out" variant="secondary" onClick={doUserLogOut} />
          </div>
        </div>
      )}
    </div>
  );
};
