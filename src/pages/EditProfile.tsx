import {useState} from "react";
import {ProfileForm} from "../components/CreateUser/ProfileForm.tsx";
import {DogProfileForm} from "../components/CreateUser/DogProfileForm.tsx";
import {AddNewDogButton} from "../components/AddNewDogButton/AddNewDogButton.tsx";

function EditProfile() {
  const [dogProfiles, setDogProfiles] = useState<number[]>([]);

  const handleAddNewDogClick = () => {
    setDogProfiles([...dogProfiles, dogProfiles.length]);
  };
  const handleRemoveLastDogClick = () => {
    setDogProfiles(dogProfiles.slice(0, -1));
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

      <ProfileForm/>
      <section className="seperator-line"></section>

      <div className="h2-title-div">
        <h2 className="yourDogsTitle">Your dogs</h2>
      </div>

      <DogProfileForm/>

      {dogProfiles.map((index) => (
        <DogProfileForm key={index}/>
      ))}

      <section className="seperator-line"></section>

      {/* Add and Remove Dog Buttons */}
      <section className="flex-column align-center">
        {/* Reuse AddNewDogButton for both actions */}
        <AddNewDogButton
          onClick={handleAddNewDogClick}
          label="Add New Dog"
          iconType="add"
        />
        {dogProfiles.length > 0 && (
          <AddNewDogButton
            onClick={handleRemoveLastDogClick}
            label="Remove Last Dog"
            iconType="remove"
          />
        )}
      </section>
    </>
  );
}

export default EditProfile;
