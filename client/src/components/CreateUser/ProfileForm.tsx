import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { FiMail, FiLock } from "react-icons/fi";
import Button from "../Button/Button";
import { FaSave } from "react-icons/fa";

const ProfileForm: React.FC = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

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
    setProfileData((prevData) => ({ ...prevData, email: emailValue }));

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
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
              value={profileData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Last name"
              value={profileData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Email"
              value={profileData.email}
              onChange={handleEmailChange}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div className="row">
            <InputField
              variant="Password"
              value={profileData.password}
              onChange={handleInputChange}
            />
            <Button
              label="Save changes"
              variant="secondary"
              icon={<FaSave />}
              onClick={() => console.log("Save changes clicked")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileForm;
