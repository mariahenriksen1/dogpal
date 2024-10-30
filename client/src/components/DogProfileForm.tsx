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
    <form className="dog-profile-form form" action="/action_page.php">
      <div className="form-content">
        <h3>Dog Profile info</h3>
        <div>
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
          <label htmlFor="email">First name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Last name</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="row">
          <div className="form-element">
            <label htmlFor="address">Email</label>
            <input type="text" id="address" name="address" />
          </div>
          <div>
            <label htmlFor="city">Password</label>
            <input type="text" id="city" name="city" />
            <button disabled>Change password</button>
          </div>
        </div>
      </div>
    </form>
  );
};
