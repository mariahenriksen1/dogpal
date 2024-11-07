import React, { useState } from "react";

export const ProfileForm = () => {
  const [ProfilePicture, setProfilePicture] = useState<string | null>(null);

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePasswordClick = () => {
    // Handle the button click event here
    console.log("Change password button clicked");
  };

  return (
    <section>
      <div className="flex-row gap-20">
        <div className="profile-picture">
          <label htmlFor="profile-picture-label">Profile Picture</label>
          <input
            type="file"
            id="profile-picture-input"
            name="profile-picture-input"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          {ProfilePicture && (
            <img
              src={ProfilePicture}
              alt="Profile Picture"
              className="profile-picture-preview"
            />
          )}
        </div>
        <div className="profile-form-inputs">
          <div className="row">
            <div className="input">
              <div className="input-label">First name</div>
              <div className="input-box">
                <div className="input-value">Freja</div>
              </div>
            </div>
            <div className="input">
              <div className="input-label">Last name</div>
              <div className="input-box">
                <div className="input-value">Sunesen</div>
              </div>
            </div>
          </div>
          <div className="weird">
            <div className="input-label">E-mail</div>

            <div className="input-box">
              <div className="input-value">freja@sunesen.com</div>
              <div className="icon-div">
                <div className="icon" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input">
              <div className="input-label">Password</div>
              <div className="input-box">
                <div className="input-value">**********</div>
                <div className="icon-div">
                  <div className="icon" />
                </div>
              </div>
            </div>
            <button className="button" onClick={handleChangePasswordClick}>
              <span>Change password</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
