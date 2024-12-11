import React from "react";
import { PublicUser } from "../../Interface";

interface UserFormProps {
  userData: Omit<PublicUser, "objectId" | "createdAt" | "updatedAt" | "userId" > & { password?: string };
  setUserData: React.Dispatch<
    React.SetStateAction<Omit<PublicUser, "objectId" | "createdAt" | "updatedAt" | "userId"> & { password?: string }>
  >;
}

const UserForm: React.FC<UserFormProps> = ({ userData, setUserData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData((prev) => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={userData.username}
        onChange={handleInputChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={userData.password || ""}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        value={userData.firstName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={userData.lastName}
        onChange={handleInputChange}
      />
      <input
        type="date"
        placeholder="Birth Date"
        name="birthDate"
        value={userData.birthDate ? new Date(userData.birthDate).toISOString().split('T')[0] : ""}
        onChange={handleInputChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {userData.profilePicture && <img src={userData.profilePicture} alt="Profile Preview" />}
    </div>
  );
};

export default UserForm;
