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
    <>
      <header>
        <section>
          <div className="flex-row space-between">
            <h1 className="color-white">Profile</h1>
          </div>
        </section>
      </header>

      <ProfileForm />
      <section className="seperatorLine"></section>
      <div className="h2TitleDiv">
        <h2 className="yourDogsTitle">Your dogs</h2>
      </div>

      <DogProfileForm />

      {dogProfiles.map((profile, index) => (
        <DogProfileForm key={index} />
      ))}

      <section className="seperatorLine"></section>

      <AddNewDogButton onAddNewDogClick={handleAddNewDogClick} />

      <div className="spacerDiv"></div>
      <div className="spacerDiv"></div>
    </>
  );
}

export default Profile;
