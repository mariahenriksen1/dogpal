import React, { useState } from "react";
import Parse from "../env.Backend/env.parseConfig.ts";
import "../App.css";
import Layout from "./Layout.tsx";

function CreateUser() {
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    ProfilePicture: "", // Stored as base64
    BirthDate: "", // User's birth date
  });

  const [dogs, setDogs] = useState([
    {
      Name: "",
      DogPicture: "", // Stored as base64
      race: "",
      DogBirthDate: "", // Dog's birth date
    },
  ]);

  async function addUserAndDogs() {
    try {
      if (!userData.username || !userData.email || !userData.password) {
        alert("Username, Email, and Password are required fields.");
        return;
      }

      if (!userData.ProfilePicture) {
        alert("ProfilePicture is required. Please upload an image.");
        return;
      }

      // Create User Object
      const User = new Parse.Object("_User");
      User.set("username", userData.username);
      User.set("firstName", userData.firstName);
      User.set("lastName", userData.lastName);
      User.set("email", userData.email);
      User.set("password", userData.password);
      User.set("ProfilePicture", userData.ProfilePicture); // Base64 string
      if (userData.BirthDate) {
        User.set("BirthDate", new Date(userData.BirthDate));
      }

      const savedUser = await User.save();
      alert("User created successfully!");

      // Handle Dog Objects
      for (const dog of dogs) {
        if (dog.Name) {
          const Dog = new Parse.Object("Dog");
          Dog.set("Name", dog.Name);
          Dog.set("UserId", savedUser);
          Dog.set("DogPicture", dog.DogPicture); // Base64 string
          Dog.set("race", dog.race);
          if (dog.DogBirthDate) {
            Dog.set("DogBirthDate", new Date(dog.DogBirthDate));
          }

          await Dog.save();
        }
      }

      alert("Dogs created successfully!");
    } catch (error) {
      console.error("Error creating user or dogs: ", error);
      alert(`Error: ${error.message}`);
    }
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUserImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUserData((prevData) => ({
        ...prevData,
        ProfilePicture: reader.result as string, // Base64 string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDogChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDogs((prevDogs) =>
      prevDogs.map((dog, i) => (i === index ? { ...dog, [name]: value } : dog))
    );
  };

  const handleDogImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setDogs((prevDogs) =>
        prevDogs.map((dog, i) =>
          i === index ? { ...dog, DogPicture: reader.result as string } : dog
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const addDogField = () => {
    setDogs((prevDogs) => [...prevDogs, { Name: "", DogPicture: "", race: "", DogBirthDate: "" }]);
  };

  const removeDogField = (index: number) => {
    setDogs((prevDogs) => prevDogs.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUserAndDogs();
  };

  return (
    <>
      <Layout />
      <form className="flex-column gap-40" onSubmit={handleSubmit}>
        <header className="flex-row space-between">
          <h1 className="color-white">Create User and Dogs</h1>
        </header>
        <section className="flex-column gap-20">
          {/* User Fields */}
          <div className="flex-column gap-10">
            <div className="form-group">
              <label htmlFor="username" className="text">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                className="input-field"
                value={userData.username}
                onChange={handleUserChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName" className="text">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="input-field"
                value={userData.firstName}
                onChange={handleUserChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="text">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="input-field"
                value={userData.lastName}
                onChange={handleUserChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                className="input-field"
                value={userData.email}
                onChange={handleUserChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className="input-field"
                value={userData.password}
                onChange={handleUserChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="BirthDate" className="text">Birth Date</label>
              <input
                type="date"
                name="BirthDate"
                id="BirthDate"
                className="input-field"
                value={userData.BirthDate}
                onChange={handleUserChange}
              />
            </div>
            <div className="profile-picture">
              <label htmlFor="ProfilePicture">Profile Picture</label>
              <input type="file" id="ProfilePicture" onChange={handleUserImageChange} />
              {userData.ProfilePicture && (
                <img src={userData.ProfilePicture} alt="Profile Preview" className="image-preview" />
              )}
            </div>
          </div>

          {/* Dogs Section */}
          <h2>Dogs</h2>
          {dogs.map((dog, index) => (
            <div key={index} className="flex-column gap-10">
              <div className="form-group">
                <label htmlFor={`Name-${index}`} className="text">Dog Name</label>
                <input
                  type="text"
                  name="Name"
                  id={`Name-${index}`}
                  placeholder="Enter dog name"
                  className="input-field"
                  value={dog.Name}
                  onChange={(e) => handleDogChange(index, e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`DogBirthDate-${index}`} className="text">Dog Birth Date</label>
                <input
                  type="date"
                  name="DogBirthDate"
                  id={`DogBirthDate-${index}`}
                  className="input-field"
                  value={dog.DogBirthDate}
                  onChange={(e) => handleDogChange(index, e)}
                />
              </div>
              <div className="profile-picture">
                <label htmlFor={`DogPicture-${index}`}>Dog Picture</label>
                <input type="file" id={`DogPicture-${index}`} onChange={(e) => handleDogImageChange(index, e)} />
                {dog.DogPicture && (
                  <img src={dog.DogPicture} alt="Dog Preview" className="image-preview" />
                )}
              </div>
              <div className="form-group">
                <label htmlFor={`race-${index}`} className="text">Dog Race</label>
                <input
                  type="text"
                  name="race"
                  id={`race-${index}`}
                  placeholder="Enter dog race"
                  className="input-field"
                  value={dog.race}
                  onChange={(e) => handleDogChange(index, e)}
                />
              </div>
              <button type="button" onClick={() => removeDogField(index)} className="addNewDogButton">
                Remove Dog
              </button>
            </div>
          ))}
          <button type="button" onClick={addDogField} className="addNewDogButton">
            Add Another Dog
          </button>
        </section>
        <button type="submit" className="createEventButton">
          Create User and Dogs
        </button>
      </form>
    </>
  );
}

export default CreateUser;
