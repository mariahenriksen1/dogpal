import React, { useState } from "react";
import InputField from "./InputField/InputField";

export const DogProfileForm = () => {
  const [dogProfilePicture, setDogProfilePicture] = useState<string | null>(
    null
  );
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [dogName, setDogName] = useState<string>("");
  const [breed, setBreed] = useState<string>("");

  const handleDogProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDogProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateOfBirthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateOfBirth(event.target.value);
  };

  const handleDogNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDogName(e.target.value);
  };

  const handleBreedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBreed(event.target.value);
  };

  return (
    <section>
      <div className="flex-row">
        <div className="dog-profile-picture">
          <label htmlFor="dog-profile-picture-input" className="input-label">
            Dog Profile Picture
          </label>
          <input
            type="file"
            id="dog-profile-picture-input"
            name="dog-profile-picture-input"
            accept="image/*"
            className="file-input"
            onChange={handleDogProfilePictureChange}
          />
          {dogProfilePicture && (
            <img
              src={dogProfilePicture}
              alt="Dog Profile Picture"
              className="dog-profile-picture-preview"
            />
          )}
        </div>

        <div className="profile-form-inputs">
          <div className="row">
            <InputField
              variant="Dog name"
              value={dogName}
              onChange={handleDogNameChange}
            />
          </div>

          <div className="row">
            <InputField
              variant="Date"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
            />
          </div>

          <div className="row">
            <InputField
              variant="Text input"
              label="Breed"
              placeholder="Enter breed"
              value={breed}
              onChange={handleBreedChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
