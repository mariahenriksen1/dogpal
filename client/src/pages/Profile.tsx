import React, { useState } from "react";
import { ProfileForm } from "../components/ProfileForm";
import { DogProfileForm } from "../components/DogProfileForm";
import { AddNewDogButton } from "../components/AddNewDogButton";

function Profile() {
  const [dogProfiles, setDogProfiles] = useState<number[]>([]);

  const handleAddNewDogClick = () => {
    setDogProfiles([...dogProfiles, dogProfiles.length]);
  };

  return (
    <div className="profile-div">
      <div className="titleBar">
        <div className="titleRow">
          <div className="titleColumn">
            <div className="titleDiv">
              <h1 className="ProfileTitle">Profile</h1>
            </div>
          </div>
        </div>
        <div className="spacerColumn"></div>
      </div>

      <ProfileForm />

      <div className="seperatorLine"></div>

      <div className="h2TitleDiv">
        <h2 className="yourDogsTitle">Your dogs</h2>
      </div>

      <DogProfileForm />

      {dogProfiles.map((profile, index) => (
        <DogProfileForm key={index} />
      ))}

      <div className="seperatorLine"></div>

      <AddNewDogButton onAddNewDogClick={handleAddNewDogClick} />

      <div className="spacerDiv"></div>
      <div className="spacerDiv"></div>
    </div>
  );
}

export default Profile;
