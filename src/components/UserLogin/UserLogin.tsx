import {useState, FC, ReactElement, useEffect} from "react";
import Parse from "../../env.Backend/env.parseConfig.ts";
import Button from "../Button/Button.tsx";
import InputField from "../InputField/InputField.tsx";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../context/UserContext.tsx";
import {fetchUserAndDogsFromCloud} from "../../hooks/useCurrentUserAndDogs.ts";

export const UserLogin: FC = (): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  const {publicUser, setPublicUser} = useUser(); // Use context state
  const navigate = useNavigate();

  /**
   * Fetch user details based on publicUser.
   */
  const fetchUserDetails = () => {
    if (publicUser) {
      const firstName = publicUser.firstName || "N/A";
      const lastName = publicUser.lastName || "N/A";
      setUserDetails({firstName, lastName});
    } else {
      setUserDetails(null);
    }
  };

  /**
   * Logs the user in with the provided credentials.
   */
  const handleLogin = async (): Promise<void> => {
    if (!username || !password) {
      toast.error("Please provide both username and password.");
      return;
    }

    try {
      const loggedInUser = await Parse.User.logIn(username, password);
      const user = await Parse.User.current()
      const response = await fetchUserAndDogsFromCloud(user.id);
      console.log("what is loggedInUser?: " + response);
      setPublicUser(response.publicUser);
      toast.success(
        `Success! User ${loggedInUser.get("username")} has successfully signed in!`
      );

      setUsername("");
      setPassword("");
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      if (error instanceof Error) {
        toast.error(`Error during login: ${error.message}`);
      }
    }
  };

  /**
   * Logs the user out and clears the state.
   */
  const handleLogout = async (): Promise<void> => {
    try {
      await Parse.User.logOut();
      toast.success("Successfully logged out!");
      setPublicUser(null); // Clear context
      setUserDetails(null);
    } catch (error) {
      console.error("Logout failed:", error);
      if (error instanceof Error) {
        toast.error(`Error during logout: ${error.message}`);
      }
    }
  };

  /**
   * Effect to update user details when publicUser changes.
   */
  useEffect(() => {
    fetchUserDetails();
  }, [publicUser]);

  return (
    <div>
      {publicUser === null ? (
        <div className="container">
          <h2>User Login</h2>
          <InputField
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            variant=""
          />
          <InputField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            variant=""
          />
          <div className="form_buttons">
            <Button label="Log In" variant="primary" onClick={handleLogin}/>
          </div>
          <Button
            label="Sign Up"
            variant="secondary"
            onClick={() => navigate("/createUser")}
          />
        </div>
      ) : (
        <div className="container">
          <h2 className="heading">{`Hello, ${publicUser.username}!`}</h2>
          {userDetails && (
            <div>
              <p>{`First Name: ${userDetails.firstName}`}</p>
              <p>{`Last Name: ${userDetails.lastName}`}</p>
            </div>
          )}
          <div className="form_buttons">
            <Button label="Log Out" variant="secondary" onClick={handleLogout}/>
          </div>
        </div>
      )}
    </div>
  );
};