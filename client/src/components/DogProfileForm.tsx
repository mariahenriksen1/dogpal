import React, { useState } from "react";

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

  const handleDogNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDogName(event.target.value);
  };

  const handleBreedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBreed(event.target.value);
  };

  const handleDogNameClick = () => {
    console.log("Edit dog button clicked");
  };

  return (
    <div className="dog-profile-form">
      <div className="profile-picture-preview">
        <div className="profile-picture">
          <label htmlFor="dog-profile-picture">Dog Profile Picture</label>
          <input
            type="file"
            id="dog-profile-picture"
            name="dog-profile-picture"
            accept="image/*"
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
      </div>

      <div className="profile-form-inputs">
        <div className="row">
          <div className="input">
            <div className="input-label">Dog Name</div>
            <div className="input-box">
              <input
                type="text"
                name="dogName"
                id="dogName"
                className="input-field"
                value={dogName}
                onChange={handleDogNameChange}
                placeholder="Enter dog's name"
              />
            </div>
          </div>
          <button className="button" onClick={handleDogNameClick}>
            <span>Edit dog</span>
          </button>
        </div>
        <div className="row">
          <div className="input">
            <div className="input-label">Date of Birth</div>
            <div className="input-box">
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="input-field"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="input">
            <div className="input-label">Breed</div>
            <div className="input-box">
              <input
                type="text"
                name="breed"
                id="breed"
                className="input-field"
                value={breed}
                onChange={handleBreedChange}
                placeholder="Enter breed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
