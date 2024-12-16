import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DogInfo from "../components/DogInfo/DogInfo.tsx";
import { IDog } from "./../interfaces.ts";
import useCurrentPublicUser from "../hooks/useCurrentPublicUser";
import profileDefault from "./../assets/profileDefault.png"; // Ensure the path is correct
import "./Styling/StylingProfile.css";
import Button from "../components/Button/Button.tsx";
import PreviewImage from "../components/PreviewImage/PreviewImage.tsx";
import EventsAttended from "../components/EventsAttended/EventsAttended.tsx";

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
  const navigate = useNavigate();

  if (!currentPublicUser) {
    return null;
  }

  const firstName = currentPublicUser?.get("firstName") || "Unknown";
  const lastName = currentPublicUser?.get("lastName") || "User";

  const profilePicture = imageError
    ? profileDefault
    : currentPublicUser?.get("profilePicture");

  const handleEditProfileClick = () => {
    navigate("/editProfile");
  };

  return (
    <>
      <header>
        <section className="profile-section">
          {/* evt lav nedenstående "profile-view" til component */}
          <div className="profile-container">
            <PreviewImage
              src={profilePicture}
              alt="Profile picture"
              onError={() => setImageError(true)}
              border="3px #f9c069 solid"
            />
            <div className="profile-details">
              <h1 className="color-white">{`${firstName} ${lastName}`}</h1>
            </div>
          </div>
        </section>
      </header>

      <main>
        <div className="profile-button-container">
          <div className="h2-title-div">
            <h2 className="yourDogsTitle">Your dogs</h2>
          </div>
          <div className="button-div">
            <Button
              label="Edit profile"
              variant="primary"
              onClick={handleEditProfileClick}
            />
          </div>
        </div>
        {/* evt lav nedenstående "doglist" til component ? */}
        <section className="flex-column align-center">
          <div className="dog-container">
            <div className="dog-list">
              {dogs.map((dog) => (
                <DogInfo
                  key={dog.id}
                  dog={dog}
                  variant="Detailed dog info"
                  textColor="black"
                  flexDirection="column"
                  pictureSize="100px"
                  border="3px #f9c069 solid"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="seperator-line"></section>

        <section className="flex-column align-center">
          <div className="h2-title-div">
            <h2 className="">Recently attended events</h2>
          </div>
          <EventsAttended />
        </section>
      </main>
    </>
  );
}

export default Profile;
