import styles from "./HeaderProfile.module.css";
import useCurrentPublicUser from "../../hooks/useCurrentPublicUser.ts";
import { IDog } from "../../interfaces.ts";
import { useState } from "react";
import profileDefault from "../../assets/profileDefault.png"; // Ensure the path is correct
import DogInfo from "../DogInfo/DogInfo.tsx";
import PreviewImage from "../PreviewImage/PreviewImage.tsx";

const testDog: IDog = {
  id: "123",
  name: "Charlie",
  breed: "Labrador",
  age: 4,
  image:
    "https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/51fe71a3-cb12-4ac2-882f-45955401dd53/Golden+Retrievers+dans+pet+care.jpeg?format=500wstring",
  date: "date",
};

const dogs: IDog[] = [testDog, testDog];

function HeaderProfile() {
  const currentPublicUser = useCurrentPublicUser();
  const [imageError, setImageError] = useState(false);

  if (!currentPublicUser) {
    return null;
  }

  const firstName = currentPublicUser?.get("firstName") || "Unknown";
  const lastName = currentPublicUser?.get("lastName") || "User";

  const profilePicture = imageError
    ? profileDefault
    : currentPublicUser?.get("profilePicture");

  return (
    <div className={styles.headerProfile}>
      <div className={styles.profileDetails}>
        <h2 className="color-white">{`${firstName} ${lastName}`}</h2>
        <div className={styles.dogList}>
          {dogs.map((dog) => (
            <DogInfo
              key={dog.id}
              dog={dog}
              variant="Dog info"
              pictureSize="25px"
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
