import React, { useState, useEffect } from "react";
import InputField from "../InputField/InputField.tsx";
import PreviewImage from "../PreviewImage/PreviewImage.tsx";
import Button from "../Button/Button.tsx";
import { AddNewDogButton } from "../AddNewDogButton/AddNewDogButton.tsx";
import { FaSave } from "react-icons/fa";
import { Dog } from "../../Interface.ts";

interface ProfileFormProps {
  initialData: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: string | null;
    dogs: Dog[];
  };
  onSubmit: (data: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: string | null;
    dogs: Dog[];
  }) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);
  const [imageError, setImageError] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDogChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      dogs: prev.dogs.map((dog, i) =>
        i === index ? { ...dog, [name]: value } : dog
      ),
    }));
  };

  const handleDogPictureChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          dogs: prev.dogs.map((dog, i) =>
            i === index ? { ...dog, dogPicture: reader.result as string } : dog
          ),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewDogClick = () => {
    setFormData((prev) => ({
      ...prev,
      dogs: [
        ...prev.dogs,
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
      ],
    }));
  };

  const handleRemoveDog = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      dogs: prev.dogs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!emailError) {
      onSubmit(formData);
    }
  };

  return (
    <section>
      <div className="h2-title-div">
        <h2 className="yourDogsTitle">User Info</h2>
      </div>
      <section className="seperator-line"></section>
      <div className="flex-row">
        <div className="dog-profile-picture">
          <label htmlFor="profile-picture-label">Profile Picture</label>
          <input
            type="file"
            id="profile-picture-input"
            name="profile-picture-input"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          {formData.profilePicture && (
            <PreviewImage
              src={formData.profilePicture}
              alt="Profile Picture"
              onError={() => setImageError(true)}
              border="3px #f9c069 solid"
              pictureSize="170px"
            />
          )}
        </div>

        <div className="profile-form-inputs">
          <div className="row">
            <InputField
              label="Username"
              variant="Text input"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="First name"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Last name"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleInputChange}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div className="row">
            <InputField
              variant="Password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="h2-title-div">
        <h2 className="yourDogsTitle">Your dogs</h2>
      </div>
      <section className="seperator-line"></section>

      {formData.dogs.map((dog, index) => (
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
                pictureSize="140px"
              />
            )}
          </div>

          <div className="profile-form-inputs">
            <div className="row">
              <InputField
                label="Dog Name"
                variant="Dog name"
                name="name"
                value={dog.name}
                placeholder={dog.name || "Dog Name"}
                onChange={(e) => handleDogChange(index, e)}
              />
            </div>
            <div className="row">
              <InputField
                label="Dog Breed"
                variant="Text input"
                name="race"
                value={dog.race || ""}
                placeholder={dog.race || "Breed"}
                onChange={(e) => handleDogChange(index, e)}
              />
            </div>
            <div className="row">
              <InputField
                label="Dog Birth Date"
                variant="Date"
                name="dogBirthDate"
                value={
                  dog.dogBirthDate
                    ? new Date(dog.dogBirthDate).toISOString().split("T")[0]
                    : ""
                }
                placeholder={
                  dog.dogBirthDate
                    ? new Date(dog.dogBirthDate).toISOString().split("T")[0]
                    : "Birth Date"
                }
                onChange={(e) => handleDogChange(index, e)}
              />
            </div>
            <div className="flex-row align-center">
              <AddNewDogButton
                label="Remove Dog"
                iconType="remove"
                onClick={() => handleRemoveDog(index)}
              />
            </div>
          </div>
        </div>
      ))}

      <section className="flex-row center">
        <AddNewDogButton
          onClick={handleAddNewDogClick}
          label={"Add new dog"}
          iconType={"add"}
        />
        <Button
          label="Save"
          icon={<FaSave />}
          onClick={handleSubmit}
          variant={"primary"}
        />
      </section>
    </section>
  );
};

export default ProfileForm;
