import React, { useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import InputField from "../InputField/InputField.tsx";
import Button from "../Button/Button.tsx";
import { AddNewDogButton } from "../AddNewDogButton/AddNewDogButton.tsx";
import PreviewImage from "../PreviewImage/PreviewImage.tsx";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileForm: React.FC = () => {
  const { publicUser, dogs, setPublicUser, setDogs } = useUser();
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPublicUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPublicUser((prev) =>
          prev ? { ...prev, profilePicture: reader.result as string } : null
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDog = () => {
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

  const handleSave = async () => {
    // Save changes logic
    console.log("Save Changes");
    navigate("/profile"); // Navigate to profile page after saving
  };

  return (
    <div>
      <h3>User Information</h3>
      <InputField
        variant="First name"
        name="firstName"
        value={publicUser?.firstName || ""}
        placeholder={publicUser?.firstName || "First Name"}
        onChange={handleInputChange}
      />
      <InputField
        variant="Last name"
        name="lastName"
        value={publicUser?.lastName || ""}
        placeholder={publicUser?.lastName || "Last Name"}
        onChange={handleInputChange}
      />
      {/* <InputField
        variant="Email"
        name="email"
        value={publicUser?.email || ""}
        placeholder={publicUser?.email || "Email"}
        onChange={handleInputChange}
      /> */}
      {/* <InputField
        variant="Password"
        name="password"
        value={publicUser?.password || ""}
        placeholder="Password"
        onChange={handleInputChange}
      /> */}
      <input type="file" onChange={handleProfilePictureChange} />
      {publicUser?.profilePicture && (
        <PreviewImage src={publicUser.profilePicture} alt="Profile" />
      )}

      <section className="seperator-line"></section>

      <h3>Your Dogs</h3>
      {dogs.map((dog, index) => (
        <div key={index}>
          <InputField
            variant="Dog name"
            name="name"
            value={dog.name}
            placeholder={dog.name || "Dog Name"}
            onChange={(e) => handleDogChange(index, e)}
          />
          <InputField
            variant="Breed"
            name="breed"
            value={dog.race || ""}
            placeholder={dog.race || "Breed"}
            onChange={(e) => handleDogChange(index, e)}
          />
          <InputField
            variant="Date"
            name="birthDate"
            value={dog.dogBirthDate ? dog.dogBirthDate.toString() : ""}
            placeholder={
              dog.dogBirthDate ? dog.dogBirthDate.toString() : "Birth Date"
            }
            onChange={(e) => handleDogChange(index, e)}
          />
          <input
            type="file"
            onChange={(e) => handleDogPictureChange(index, e)}
          />
          {dog.dogPicture && <PreviewImage src={dog.dogPicture} alt="Dog" />}
          <AddNewDogButton
            label="Remove Dog"
            iconType="remove"
            onClick={() => handleRemoveDog(index)}
          />
        </div>
      ))}
      <AddNewDogButton
        label="Add Another Dog"
        iconType="add"
        onClick={handleAddDog}
      />

      <Button
        label="Save Changes"
        icon={<FaSave />}
        onClick={handleSave}
        variant={"primary"}
      />
    </div>
  );
};

export default ProfileForm;
