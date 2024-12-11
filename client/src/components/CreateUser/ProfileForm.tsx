import React, { useState, useCallback } from "react";

export const ProfileForm = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleProfilePictureChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicture(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleChangePasswordClick = useCallback(() => {
    console.log("Change password button clicked");
  }, []);

  return (
    <section className="profile-form">
      <div className="flex-row gap-20">
        {/* Profile Picture Section */}
        <div className="profile-picture-section">
          <label htmlFor="profile-picture-input" className="input-label">
            Profile Picture
          </label>
          <input
            type="file"
            id="profile-picture-input"
            name="profile-picture-input"
            accept="image/*"
            className="file-input"
            onChange={handleProfilePictureChange}
          />
          {profilePicture && (
            <img
              src={profilePicture}
              alt="Selected profile preview"
              className="profile-picture-preview"
            />
          )}
        </div>

        {/* Profile Information Section */}
        <div className="profile-form-inputs flex-column gap-20">
          {/* Name Inputs */}
          <div className="row flex-row gap-20">
            <div className="input">
              <label className="input-label">First Name</label>
              <div className="input-box">
                <span className="input-value">Freja</span>
              </div>
            </div>
            <div className="input">
              <label className="input-label">Last Name</label>
              <div className="input-box">
                <span className="input-value">Sunesen</span>
              </div>
            </div>
          </div>

          {/* Email Input */}
          <div className="row">
            <div className="input">
              <label className="input-label">E-mail</label>
              <div className="input-box flex-row align-center">
                <span className="input-value">freja@sunesen.com</span>
                <div className="icon-div">
                  <div className="icon"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="row flex-row space-between align-center">
            <div className="input">
              <label className="input-label">Password</label>
              <div className="input-box flex-row align-center">
                <span className="input-value">**********</span>
                <div className="icon-div">
                  <div className="icon"></div>
                </div>
              </div>
            </div>
            <button
              className="button primary-button"
              onClick={handleChangePasswordClick}
            >
              <span>Change Password</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
