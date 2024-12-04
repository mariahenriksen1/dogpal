import React, { useState, useEffect, FC } from "react";
import Parse from "../../env.Backend/env.parseConfig";
import Button from "../Button/Button";

interface Dog {
  name: string;
  race: string;
  dogBirthDate: string;
  dogPicture: string;
}

const UserInfoWithDogs: FC = (): React.ReactElement => {
  const [currentUser, setCurrentUser] = useState<Parse.User | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndDogs = async () => {
      try {
        const user = Parse.User.current();
        console.log("Current User:", user); // Debugging current user
        if (user) {
          setCurrentUser(user);
          await fetchDogs(user);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDogs = async (user: Parse.User) => {
      try {
        const publicUserId = user.get("publicUserId");
        console.log("publicUserId:", publicUserId); // Debugging publicUserId
        if (!publicUserId) {
          console.warn("No publicUserId found for the user.");
          return;
        }

        const DogQuery = new Parse.Query("Dog");
        DogQuery.equalTo("UserId", publicUserId);

        const dogResults = await DogQuery.find();
        console.log("Dog Query Results:", dogResults); // Debugging dog query results

        if (dogResults.length === 0) {
          console.warn("No dogs found for the user.");
        }

        const userDogs = dogResults.map((dog) => ({
          name: dog.get("Name"),
          race: dog.get("race"),
          dogBirthDate: dog.get("DogBirthDate")
            ? new Date(dog.get("DogBirthDate")).toLocaleDateString()
            : "Unknown",
          dogPicture: dog.get("DogPicture"),
        }));

        setDogs(userDogs);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };

    fetchUserAndDogs();
  }, []);

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      setCurrentUser(null);
      setDogs([]);
      alert("Successfully logged out!");
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error during logout: ${error.message}`);
      }
    }
  };

  if (loading) {
    return <p>Loading user information...</p>;
  }

  if (!currentUser) {
    return <p>Please log in to see user information.</p>;
  }

  return (
    <div className="user-info-container">
      <div className="user-details">
        <h2 className="user-greeting">{`Hello, ${currentUser.get("username")}!`}</h2>
        <p className="user-email">{`Email: ${currentUser.get("email")}`}</p>
      </div>

      <div className="dogs-section">
        <h3>Your Dogs</h3>
        {dogs.length === 0 ? (
          <p>You have not added any dogs yet.</p>
        ) : (
          <div className="dog-list">
            {dogs.map((dog, index) => (
              <div className="dog-card" key={index}>
                {dog.dogPicture && (
                  <img
                    src={dog.dogPicture}
                    alt={`${dog.name} Picture`}
                    className="dog-picture"
                  />
                )}
                <h4 className="dog-name">{dog.name}</h4>
                <p className="dog-race">{`Race: ${dog.race}`}</p>
                <p className="dog-birthdate">{`Birth Date: ${dog.dogBirthDate}`}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="logout-button">
        <Button label="Log Out" variant="secondary" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default UserInfoWithDogs;
