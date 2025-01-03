import React, {useState} from "react";
import InputField from "../InputField/InputField";
import PreviewImage from "../PreviewImage/PreviewImage";

interface UserFormProps {
  userData: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: string;
    birthDate: string;
  };
  setUserData: React.Dispatch<
    React.SetStateAction<{
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      profilePicture: string;
      birthDate: string;
    }>
  >;
}

const UserForm: React.FC<UserFormProps> = ({userData, setUserData}) => {
  const [emailError, setEmailError] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setUserData((prevData) => ({...prevData, [name]: value}));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setUserData((prevData) => ({...prevData, email: emailValue}));

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section>
      <div className="flex-row">
        <div className="profile-picture">
          <label htmlFor="profile-picture-input">Profile Picture</label>
          <input
            type="file"
            id="profile-picture-input"
            name="profile-picture-input"
            accept="image/*"
            onChange={handleImageChange}
          />
          {userData.profilePicture && (
            <PreviewImage
              src={userData.profilePicture}
              alt="Profile picture preview"
            />
          )}
        </div>

        <div className="profile-form-inputs">
          <div className="row">
            <InputField
              variant="First name"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Last name"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Text input"
              name="username"
              label="Username"
              placeholder="Enter your user name"
              value={userData.username}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Email"
              name="email"
              value={userData.email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="row">
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div className="row">
            <InputField
              variant="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Date"
              name="birthDate"
              value={userData.birthDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserForm;
