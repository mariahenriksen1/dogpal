import React from "react";
import { useUser } from "../context/UserContext.tsx";
import ProfileForm from "../components/CreateUser/ProfileForm.tsx";
import DogProfileForm from "../components/CreateUser/DogProfileForm.tsx";
import { AddNewDogButton } from "../components/AddNewDogButton/AddNewDogButton.tsx";
import Button from "../components/Button/Button.tsx";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router";

const EditProfile: React.FC = () => {
  const { dogs, setDogs } = useUser();
  const navigate = useNavigate();

  const handleDogChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setDogs((prevDogs) =>
      prevDogs.map((dog, i) => (i === index ? { ...dog, [name]: value } : dog))
    );
  };

  const handleDogPictureChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDogs((prevDogs) =>
          prevDogs.map((dog, i) =>
            i === index ? { ...dog, dogPicture: reader.result as string } : dog
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewDogClick = () => {
    setDogs([
      ...dogs,
      {
        objectId: "",
        name: "",
        dogPicture: "",
        race: "",
        dogBirthDate: "",
        userId: "",
        createdAt: "",
        updatedAt: "",
      },
    ]);
  };

  const handleRemoveDog = (index: number) => {
    setDogs(dogs.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    // Save changes logic
    console.log("Save Changes");
    navigate("/profile"); // Navigate to profile page after saving
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

      <section>
        <div className="flex-row space-between">
          <h2>User info</h2>
        </div>
      </section>

      <ProfileForm />
      <section className="seperator-line"></section>
      <section>
        <div className="flex-row space-between">
          <h2>Your dogs</h2>
        </div>
      </section>

      {dogs.map((dog, index) => (
        <DogProfileForm
          key={index}
          dog={dog}
          index={index}
          handleDogChange={handleDogChange}
          handleDogPictureChange={handleDogPictureChange}
          handleRemoveDog={handleRemoveDog}
        />
      ))}

      <section className="flex-row center">
        <AddNewDogButton
          label="Add New Dog"
          onClick={handleAddNewDogClick}
          iconType={"add"}
        />
        <Button
          label="Save Changes"
          icon={<FaSave />}
          onClick={handleSave}
          variant={"primary"}
        />
      </section>
    </>
  );
};

export default EditProfile;
