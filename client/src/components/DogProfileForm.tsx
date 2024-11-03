import React, { useState } from "react";

export const DogProfileForm = () => {
  const [dogProfilePicture, setDogProfilePicture] = useState<string | null>(
    null
  );

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

  return (
    <div className="div-for-dog-profiles">
      <form className="dog-profile-form form" action="/action_page.php">
        <div className="form-content">
          <div className="profile-pic-div">
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
                alt="Dog Profile"
                className="dog-profile-picture-preview"
              />
            )}
          </div>
          <div>
            <label htmlFor="dogName">Dog name</label>
            <input type="text" id="dogName" name="dogName" />
          </div>
          <div>
            <label htmlFor="DoB">Date of birth</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="row">
            <div>
              <label htmlFor="dogBreed">Dog breed</label>
              <input type="text" id="dogBreed" name="dogBreed" />
            </div>
          </div>
        </div>
      </form>
      <div className="seperatorLine"></div>
    </div>
  );
};
