import React from "react";
import PreviewImage from "../../PreviewImage/PreviewImage";
import InputField from "../../InputField/InputField";

interface UserFormProps {
  userData: {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: string;
    birthDate: string;
  };
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

// const [emailError, setEmailError] = useState<string>("");

const UserForm: React.FC<UserFormProps> = ({ userData, setUserData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData: typeof userData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      setUserData((prevData: typeof userData) => ({
        ...prevData,
        profilePicture: reader.result as string,
      }));
    reader.readAsDataURL(file);
  };

  //   // Email validation regex
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(emailValue)) {
  //     setEmailError("Please enter a valid email address.");
  //   } else {
  //     setEmailError("");
  //   }
  // };

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
            onChange={handleImageChange}
          />
          {userData.profilePicture && (
            <PreviewImage src={userData.profilePicture} alt="Profile Preview" />
          )}
        </div>

        <div className="profile-form-inputs">
          <div className="row">
            <InputField
              variant="First name"
              value={userData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Last name"
              value={userData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Text input"
              label="Username"
              placeholder="Enter your user name"
              value={userData.userName}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Email"
              value={userData.email}
              onChange={handleInputChange}
            />
            {/* {emailError && <div className="error-message">{emailError}</div>} */}
          </div>
          <div className="row">
            <InputField
              variant="Password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="row">
            <InputField
              variant="Date"
              value={userData.birthDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserForm;
