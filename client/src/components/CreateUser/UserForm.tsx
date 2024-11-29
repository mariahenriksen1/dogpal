import React from "react";
import PreviewImage from "../PreviewImage";

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
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

const UserForm: React.FC<UserFormProps> = ({ userData, setUserData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData: typeof userData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      setUserData((prevData: typeof userData) => ({ ...prevData, profilePicture: reader.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <section className="user-form flex-column gap-20">
      <div className="input-group">
        <label className="input-label" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="input-field"
          placeholder="Username"
          value={userData.username}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input-field"
          placeholder="Email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input-field"
          placeholder="Password"
          value={userData.password}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="input-field"
          placeholder="First Name"
          value={userData.firstName}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="lastName">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="input-field"
          placeholder="Last Name"
          value={userData.lastName}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="birthDate">
          Birth Date
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          className="input-field"
          placeholder="Birth Date"
          value={userData.birthDate}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="profilePicture">
          Profile Picture
        </label>
        <input
          type="file"
          id="profilePicture"
          className="file-input"
          onChange={handleImageChange}
        />
        {userData.profilePicture && (
          <PreviewImage
            src={userData.profilePicture}
            alt="Profile Preview"
          />
        )}
      </div>
    </section>
  );
};

export default UserForm;
