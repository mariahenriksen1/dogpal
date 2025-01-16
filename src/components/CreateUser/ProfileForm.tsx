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
    <section>
      <div className="flex-row">
        <div className="profile-picture">
          <label htmlFor="profile-picture-label">Profile Picture</label>
          <input
            type="file"
            id="profile-picture-input"
            name="profile-picture-input"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          {publicUser?.profilePicture && (
            <PreviewImage
              src={publicUser.profilePicture}
              alt="Profile Picture"
              onError={() => setImageError(true)}
              border="3px #f9c069 solid"
            />
          )}
        </div>

        <div className="profile-form-inputs">
          <div className="row">
            <InputField
              variant="First name"
              name="firstName"
              value={publicUser?.firstName || ""}
              placeholder={publicUser?.firstName || "First Name"}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Last name"
              name="lastName"
              value={publicUser?.lastName || ""}
              placeholder={publicUser?.lastName || "Last Name"}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Email"
              name="email"
              value={publicUser?.firstName || ""}
              placeholder={publicUser?.firstName || "Email"}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Password"
              name="password"
              value={publicUser?.firstName || ""}
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <section className="seperator-line"></section>

      <h3>Your Dogs</h3>
      {dogs.map((dog, index) => (
        <div key={index} className="flex-row">
          <div className="dog-profile-picture">
            <label htmlFor={`dog-profile-picture-input-${index}`}>
              Dog Profile Picture
            </label>
            <input
              type="file"
              id={`dog-profile-picture-input-${index}`}
              name={`dog-profile-picture-input-${index}`}
              accept="image/*"
              onChange={(e) => handleDogPictureChange(index, e)}
            />
            {dog.dogPicture && (
              <PreviewImage
                src={dog.dogPicture}
                alt="Dog Profile Picture"
                onError={() => setImageError(true)}
                border="3px #f9c069 solid"
              />
            )}
          </div>

          <div className="profile-form-inputs">
            <div className="row">
              <InputField
                variant="Dog name"
                name="name"
                value={dog.name}
                placeholder={dog.name || "Dog Name"}
                onChange={(e) => handleDogChange(index, e)}
              />
            </div>
            <div className="row">
              <InputField
                variant="Breed"
                name="breed"
                value={dog.race || ""}
                placeholder={dog.race || "Breed"}
                onChange={(e) => handleDogChange(index, e)}
              />
            </div>
            <div className="row">
              <InputField
                variant="Date"
                name="birthDate"
                value={dog.dogBirthDate ? dog.dogBirthDate.toString() : ""}
                placeholder={
                  dog.dogBirthDate ? dog.dogBirthDate.toString() : "Birth Date"
                }
                onChange={(e) => handleDogChange(index, e)}
              />
            </div>
          </div>
        </div>
      ))}

      <section className="flex-column align-center">
        <AddNewDogButton
          label="Add New Dog"
          iconType="add"
          onClick={handleAddNewDogClick}
        />
      </section>

      <Button
        label="Save Changes"
        icon={<FaSave />}
        onClick={handleSave}
        variant={"primary"}
      />
    </section>
  );
};

export default ProfileForm;
