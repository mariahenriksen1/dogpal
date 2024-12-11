import React from "react";
import { useUserAndDogs } from "../../hooks/useUserAndDogs";

const UserInfoWithDogs: React.FC = () => {
  const { currentUser, dogs, loading } = useUserAndDogs();

  if (loading) return <p>Loading user information...</p>;

  if (!currentUser) return <p>Please log in to see user information.</p>;

  return (
    <div>
      <h2>{`Hello, ${currentUser.username}!`}</h2>
      {currentUser.profilePicture && (
        <img src={currentUser.profilePicture} alt="User Profile" />
      )}
      <p>{`Email: ${currentUser.email}`}</p>
      <p>{`First Name: ${currentUser.firstName || "N/A"}`}</p>
      <p>{`Last Name: ${currentUser.lastName || "N/A"}`}</p>

      <h3>Your Dogs</h3>
      {dogs.length === 0 ? (
        <p>You have no dogs added yet.</p>
      ) : (
        <ul>
          {dogs.map((dog) => {
            const birthDate =
              dog.dogBirthDate && !isNaN(new Date(dog.dogBirthDate).getTime())
                ? new Date(dog.dogBirthDate).toLocaleDateString()
                : "Unknown";

            return (
              <li key={dog.objectId}>
                <h4>{dog.name}</h4>
                {dog.dogPicture && <img src={dog.dogPicture} alt={dog.name} />}
                <p>{`Breed: ${dog.race || "Unknown"}`}</p>
                <p>{`Birth Date: ${birthDate}`}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UserInfoWithDogs;
