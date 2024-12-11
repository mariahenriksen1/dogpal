import React, { useState } from "react";
import { saveUserAndDogs } from "../../hooks/useUserAndDogs"; 


const CreateUserAndDog: React.FC = () => {
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const [dogs, setDogs] = useState([{ name: "", dogPicture: "", race: "", dogBirthDate: "" }]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData((prev) => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDogChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDogs((prevDogs) =>
      prevDogs.map((dog, i) => (i === index ? { ...dog, [name]: value } : dog))
    );
  };

  const handleAddDog = () => {
    setDogs([...dogs, { name: "", dogPicture: "", race: "", dogBirthDate: "" }]);
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
      <input type="text" placeholder="Username" name="username" value={userData.username} onChange={handleInputChange} />
      <input type="email" placeholder="Email" name="email" value={userData.email} onChange={handleInputChange} />
      <input type="password" placeholder="Password" name="password" value={userData.password} onChange={handleInputChange} />
      <input type="text" placeholder="First Name" name="firstName" value={userData.firstName} onChange={handleInputChange} />
      <input type="text" placeholder="Last Name" name="lastName" value={userData.lastName} onChange={handleInputChange} />
      <input type="file" onChange={handleProfilePictureChange} />
      
      <h3>Add Dogs</h3>
      {dogs.map((dog, index) => (
        <div key={index}>
          <input type="text" placeholder="Dog Name" name="name" value={dog.name} onChange={(e) => handleDogChange(index, e)} />
          <input type="text" placeholder="Race" name="race" value={dog.race} onChange={(e) => handleDogChange(index, e)} />
          <input type="date" placeholder="Birth Date" name="dogBirthDate" value={dog.dogBirthDate} onChange={(e) => handleDogChange(index, e)} />
          <input type="file" onChange={(e) => handleDogChange(index, e)} />
        </div>
      ))}
      <button onClick={handleAddDog}>Add Another Dog</button>
      <button onClick={handleSubmit} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
    </div>
  );
};

export default CreateUserAndDog;
