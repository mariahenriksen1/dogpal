import React, { useState } from "react";
import styles from "./HeaderProfile.module.css";
import profileDefault from "../../assets/profileDefault.png";
import DogInfo from "../DogInfo/DogInfo.tsx";
import PreviewImage from "../PreviewImage/PreviewImage.tsx";
import { useUser } from "../../context/UserContext.tsx";

function HeaderProfile() {
  const { publicUser, dogs, loading } = useUser();
  const [imageError, setImageError] = useState(false);

  console.log("publicUser:", publicUser);

  if (loading) {
    return <div className="color-white">Loading profile...</div>;
  }

  if (!publicUser) {
    return <div className="color-white"></div>;
  }

  const firstName = publicUser.firstName || "Unknown";
  const lastName = publicUser.lastName || "User";

  const profilePicture = imageError
    ? profileDefault
    : (publicUser.profilePicture as string) || profileDefault;

  return (
    <div className={styles.headerProfile}>
      <div className={styles.profileDetails}>
        <h2 className="color-white">{`${firstName} ${lastName}`}</h2>
        <div className={styles.dogList}>
          {dogs.map((dog) => (
            <DogInfo
              key={dog.objectId}
              dog={dog}
              variant="Dog info"
              textColor="white"
              flexDirection="column"
              pictureSize="27px"
            />
          ))}
          {dogs.length === 0 ? (
            <div className="color-white">No furry friends were found</div>
          ) : null}
        </div>
      </div>
      <PreviewImage
        src={profilePicture}
        alt="Profile picture"
        pictureSize="70px"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default HeaderProfile;
