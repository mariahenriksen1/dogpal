import React, { useState } from "react";

export const DogProfileForm = () => {
  const [dogProfilePicture, setDogProfilePicture] = useState<string | null>(
    null,
  );
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [dogName, setDogName] = useState<string>("");
  const [breed, setBreed] = useState<string>("");

  const handleDogProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
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
    event: React.ChangeEvent<HTMLInputElement>,
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
    <section>
      <div className="flex-row gap-20">
        <div className="dog-profile-picture">
          <label htmlFor="dog-profile-picture-label">Dog Profile Picture</label>
          <input
            type="file"
            id="dog-profile-picture-input"
            name="dog-profile-picture-input"
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
        <div className="profile-form-inputs">
          <div className="row">
            <div className="input">
              <label className="input-label">Dog Name</label>
              <input
                type="text"
                name="dogName"
                id="dogName"
                className={`input-field ${dogName ? "has-value" : ""}`}
                value={dogName}
                onChange={handleDogNameChange}
                placeholder="Enter dog's name"
              />
            </div>
          </div>
          <div className="row">
            <div className="input">
              <div className="input-label">Date of Birth</div>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className={`input-field ${dateOfBirth ? "has-value" : ""}`}
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="input">
              <div className="input-label">Breed</div>
              <input
                type="text"
                name="breed"
                id="breed"
                className={`input-field ${breed ? "has-value" : ""}`}
                value={breed}
                onChange={handleBreedChange}
                placeholder="Enter breed"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
