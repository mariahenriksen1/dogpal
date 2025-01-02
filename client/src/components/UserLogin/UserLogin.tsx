import { useState, FC, ReactElement, useEffect } from "react";
import Parse from "../../env.Backend/env.parseConfig";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCurrentPublicUser from "../../hooks/useCurrentPublicUser";
import { useNavigate } from "react-router-dom";


export const UserLogin: FC<{}> = (): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<Parse.Object | null>(null);
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  const publicUser = useCurrentPublicUser();
  const navigate = useNavigate();

  const getCurrentUser = async function (): Promise<void> {
    const user = await Parse.User.current();
    if (user) {
      setCurrentUser(user);
      if (publicUser) {
        const firstName = publicUser.get("firstName") || "N/A";
        const lastName = publicUser.get("lastName") || "N/A";
        setUserDetails({ firstName, lastName });
      } else {
        setUserDetails(null); 
      }
    } else {
      setCurrentUser(null);
      setUserDetails(null);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser, navigate]);
  
  const doUserLogIn = async function () {
    try {
      const loggedInUser = await Parse.User.logIn(username, password);
  
      toast.success(
        `Success! User ${loggedInUser.get("username")} has successfully signed in!`
      );
  
      navigate("/profile");
  
      setUsername("");
      setPassword("");
  
      await getCurrentUser();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error during login: ${error.message}`);
      }
    }
  };
  

  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      toast.success("Successfully logged out!");
      setCurrentUser(null);
      setUserDetails(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error during logout: ${error.message}`);
      }
    }
  };

  return (
    <div>
      {currentUser === null ? (
        <div className="container">
          <h2>User Login</h2>

          <InputField
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            variant={""}
          />
          <InputField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            variant={""}
          />

          <div className="form_buttons">
            <Button label="Log In" variant="primary" onClick={doUserLogIn} />
            </div>
            <Button
              label="Sign Up"
              variant="secondary"
              onClick={() => navigate("/createUser")}
            />
          </div>

      ) : (
        <div className="container">
          <h2 className="heading">{`Hello, ${currentUser.get(
            "username"
          )}!`}</h2>
          {userDetails && (
            <div>
              <p>{`First Name: ${userDetails.firstName}`}</p>
              <p>{`Last Name: ${userDetails.lastName}`}</p>
            </div>
          )}
          <div className="form_buttons">
            <Button
              label="Log Out"
              variant="secondary"
              onClick={doUserLogOut}
            />
          </div>
        </div>
      )}
    </div>
  );
};
