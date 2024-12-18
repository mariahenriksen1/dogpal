import React, { useState } from "react";
import { saveUserAndDogs } from "../../hooks/useUserAndDogs";
import { Dog } from "../../Interface";
import { AddNewDogButton } from "../AddNewDogButton/AddNewDogButton";

const CreateUserAndDog: React.FC = () => {
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const [dogs, setDogs] = useState<Dog[]>([
    {
      objectId: "",
      name: "",
      dogPicture: "",
      race: "",
      dogBirthDate: "",
      userId: "",
      createdAt: "",
      updatedAt: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDogChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setDogs((prevDogs) =>
      prevDogs.map((dog, i) => (i === index ? { ...dog, [name]: value } : dog))
    );
  };

  const handleDogPictureChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDogs((prevDogs) =>
          prevDogs.map((dog, i) =>
            i === index ? { ...dog, dogPicture: reader.result as string } : dog
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDog = () => {
    setDogs([
      ...dogs,
      {
        objectId: "",
        name: "",
        dogPicture: "",
        race: "",
        dogBirthDate: "",
        userId: "",
        createdAt: "",
        updatedAt: "",
      },
    ]);
  };

  const handleRemoveDog = (index: number) => {
    setDogs(dogs.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await saveUserAndDogs(userData, dogs);
      alert("User and Dogs saved successfully!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error saving user and dogs:", error.message);
      } else {
        console.error("Error saving user and dogs:", error);
      }
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create or Update User</h2>
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
        value={userData.password}
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
      <input type="file" onChange={handleProfilePictureChange} />

      <h3>Add Dogs</h3>
      {dogs.map((dog, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Dog Name"
            name="name"
            value={dog.name}
            onChange={(e) => handleDogChange(index, e)}
          />
          <input
            type="text"
            placeholder="Race"
            name="race"
            value={dog.race}
            onChange={(e) => handleDogChange(index, e)}
          />
          <input
            type="date"
            placeholder="Birth Date"
            name="dogBirthDate"
            value={
              dog.dogBirthDate
                ? new Date(dog.dogBirthDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => handleDogChange(index, e)}
          />
          <input
            type="file"
            onChange={(e) => handleDogPictureChange(index, e)}
          />

          {/* Add Remove Dog Button */}
          <AddNewDogButton
            label="Remove Dog"
            iconType="remove"
            onClick={() => handleRemoveDog(index)}
          />
        </div>
      ))}

      {/* Add Add Dog Button */}
      <AddNewDogButton label="Add Another Dog" iconType="add" onClick={handleAddDog} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default CreateUserAndDog;
