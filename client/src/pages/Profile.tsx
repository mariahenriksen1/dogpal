import React, { useState } from "react";
import DogInfo from "../components/DogInfo/DogInfo.tsx";
import { IDog } from "./../interfaces.ts";
import useCurrentPublicUser from "../hooks/useCurrentPublicUser";
import profileDefault from "./../assets/profileDefault.png"; // Ensure the path is correct
import "./Styling/StylingProfile.css";

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

function Profile() {
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
    <>
      <header>
        <section className="profile-section">
          {/* evt lav nedenstående "profile-view" til component */}
          <div className="header-profile">
            <img
              className="profile-picture"
              src={profilePicture}
              onError={() => setImageError(true)}
              alt="Profile picture"
            />
            <div className="profile-details">
              <h1 className="color-white">{`${firstName} ${lastName}`}</h1>
            </div>
          </div>
        </section>
      </header>

      {/* evt lav nedenstående "doglist" til component ? */}
      <section className="flex-column align-center">
        <div className="dog-list">
          {dogs.map((dog) => (
            <DogInfo
              key={dog.id}
              dog={dog}
              variant="Detailed dog info"
              textColor="black"
              pictureSize="60px"
            />
          ))}
        </div>
      </section>

      <section className="seperator-line"></section>

      <section className="flex-column align-center">
        <div className="h2-title-div">
          <h2 className="">Recently attended events</h2>
        </div>{" "}
      </section>
    </>
  );
}

export default Profile;
