import React, { useState } from "react";
import Parse from "../../env.Backend/env.parseConfig";
import UserForm from "./UserForm";
import DogManager from "./DogManager";
import { PublicUser, Dog } from "../../Interface";

const UserProfileManager: React.FC = () => {
  const [userData, setUserData] = useState<Omit<PublicUser, "objectId" | "createdAt" | "updatedAt" | "userId"> & { password?: string, birthDate: Date }>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
    birthDate: new Date(),
  });

  const [dogs, setDogs] = useState<Omit<Dog, "objectId" | "createdAt" | "updatedAt" | "userId">[]>([
    { name: "", dogPicture: "", race: "", dogBirthDate: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const validateInputs = (): boolean => {
    if (!userData.username || !userData.email || !userData.password) {
      alert("Username, Email, and Password are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await Parse.Cloud.run("saveUserAndDogs", {
        userData,
        dogs: dogs.filter((dog) => dog.name), // Only include dogs with names
      });
      console.log("Cloud Code Response:", response);

      alert("User and public profile created successfully!");
      setUserData({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
        birthDate: new Date(),
      });
      setDogs([{ name: "", dogPicture: "", race: "", dogBirthDate: "" }]);
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>User Profile Manager</h1>
      <form onSubmit={handleSubmit}>
        <UserForm userData={userData} setUserData={setUserData} />
        <hr />
        <DogManager dogs={dogs} setDogs={setDogs} />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserProfileManager;
