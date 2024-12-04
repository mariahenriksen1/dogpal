import React, { useState } from "react";
import InputField from "./InputField/InputField";
import { FiMail, FiLock } from "react-icons/fi";

export const ProfileForm = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("freja@sunesen.com");
  const [firstName, setFirstName] = useState<string>("Freja");
  const [lastName, setLastName] = useState<string>("Sunesen");
  const [password, setPassword] = useState<string>("**********");
  const [emailError, setEmailError] = useState<string>("");

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangePasswordClick = () => {
    console.log("Change password button clicked");
  };

  return (
    <section className="profile-form">
      <div className="flex-row gap-20">
        <div className="profile-picture-section1">
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
              alt="Profile Picture"
              className="profile-picture-preview"
            />
          )}
        </div>

        <div className="profile-form-inputs">
          <div className="row">
            <InputField
              variant="First name"
              label="First name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <InputField
              variant="Last name"
              label="Last name"
              placeholder="Enter your last name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Email"
              label="E-mail"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              icon={<FiMail />}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div className="row">
            <InputField
              variant="Password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              icon={<FiLock />}
            />
            <button className="button" onClick={handleChangePasswordClick}>
              <span>Change password</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
