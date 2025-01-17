import React, { useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import InputField from "../InputField/InputField.tsx";
import PreviewImage from "../PreviewImage/PreviewImage.tsx";

const ProfileForm: React.FC = () => {
  const { publicUser, setPublicUser } = useUser();
  const [imageError, setImageError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPublicUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPublicUser((prev) =>
          prev ? { ...prev, profilePicture: reader.result as string } : null
        );
      };
      reader.readAsDataURL(file);
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
          {publicUser?.profilePicture && (
            <PreviewImage
              src={publicUser.profilePicture}
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
              variant="First name"
              name="firstName"
              value={publicUser?.firstName || ""}
              placeholder={publicUser?.firstName || "First Name"}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Last name"
              name="lastName"
              value={publicUser?.lastName || ""}
              placeholder={publicUser?.lastName || "Last Name"}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Email"
              name="email"
              value={publicUser?.firstName || ""}
              placeholder={publicUser?.firstName || "Email"}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Password"
              name="password"
              value={publicUser?.firstName || ""}
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileForm;
