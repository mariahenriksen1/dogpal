import styles from "./HeaderProfile.module.css";
import useCurrentPublicUser from "../../hooks/useCurrentPublicUser.ts";
import { useState } from "react";
import profileDefault from "../../assets/profileDefault.png"; // Ensure the path is correct
import DogInfo from "../DogInfo/DogInfo.tsx";
import PreviewImage from "../PreviewImage/PreviewImage.tsx";
import { useUserAndDogs } from "../../hooks/useUserAndDogs"; // Import the hook

function HeaderProfile() {
  const currentPublicUser = useCurrentPublicUser();
  const [imageError, setImageError] = useState(false);
  const { dogs } = useUserAndDogs(); // Use the hook to get the dog data

  if (!currentPublicUser) {
    return null;
  }

  const firstName = currentPublicUser?.get("firstName") || "Unknown";
  const lastName = currentPublicUser?.get("lastName") || "User";

  const profilePicture = imageError
    ? profileDefault
    : currentPublicUser?.get("profilePicture");

  if (dogs.length === 0) {
    return <div>No dogs available</div>;
  }

  return (
    <div className={styles.headerProfile}>
      <div className={styles.profileDetails}>
        <h2 className="color-white">{`${firstName} ${lastName}`}</h2>
        <div className={styles.dogList}>
          {dogs.map((dog) => (
            <DogInfo
              key={dog.objectId} // Ensure each key is unique
              dog={dog}
              variant="Dog info"
              textColor="white"
              flexDirection="column"
              pictureSize="27px"
            />
          ))}
        </div>
      </div>
      <PreviewImage
        src={profilePicture}
        alt="Profile picture"
        pictureSize="70px" // Use the specified size
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default HeaderProfile;
