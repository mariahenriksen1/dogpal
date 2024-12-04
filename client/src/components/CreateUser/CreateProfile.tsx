import React, { useState } from "react";
import Parse from "../../env.Backend/env.parseConfig";
import UserForm from "./UserForm/UserForm";
import DogForm from "./DogForm";
import { AddNewDogButton } from "../AddNewDogButton/AddNewDogButton";

const CreateProfile: React.FC = () => {
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: "",
    birthDate: "",
  });

  const [dogs, setDogs] = useState([
    { name: "", picture: "", breed: "", birthDate: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!userData.username || !userData.email || !userData.password) {
        alert("Username, Email, and Password are required.");
        return;
      }

      console.log("Submitting user data:", userData);

      // Create Parse User
      const User = new Parse.User();
      User.set("username", userData.username);
      User.set("email", userData.email);
      User.set("password", userData.password);

      const savedUser = await User.signUp();
      console.log("User signed up:", savedUser);

      // Create PublicUser
      const PublicUser = new Parse.Object("PublicUser");
      PublicUser.set("username", userData.username);
      PublicUser.set("firstName", userData.firstName);
      PublicUser.set("lastName", userData.lastName);
      PublicUser.set("profilePicture", userData.profilePicture);
      PublicUser.set("userId", savedUser);

      const savedPublicUser = await PublicUser.save();
      console.log("PublicUser saved:", savedPublicUser);

      // Link the PublicUser to the User
      savedUser.set("publicUserId", savedPublicUser); // Correct
      await savedUser.save();

      console.log("User linked to PublicUser.");

      // Create Dog Records
      await Promise.all(
        dogs
          .filter((dog) => dog.name)
          .map(async (dog) => {
            const Dog = new Parse.Object("Dog");
            Dog.set("Name", dog.name);
            Dog.set("UserId", savedPublicUser); // Link to the PublicUser
            Dog.set("DogPicture", dog.picture);
            Dog.set("race", dog.breed);
            if (dog.birthDate) {
              Dog.set("DogBirthDate", new Date(dog.birthDate));
            }
            await Dog.save();
            console.log("Dog saved:", dog);
          })
      );

      alert("User and public profile created successfully!");
      // Reset form state
      setUserData({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profilePicture: "",
        birthDate: "",
      });
      setDogs([{ name: "", picture: "", breed: "", birthDate: "" }]);
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewDogClick = () => {
    setDogs([...dogs, { name: "", picture: "", breed: "", birthDate: "" }]);
  };

  return (
    <>
      <header>
        <section>
          <div className="flex-row space-between">
            <h1 className="color-white">Create Profile</h1>
          </div>
        </section>
      </header>

      <form className="profile-form flex-column gap-40" onSubmit={handleSubmit}>
        <UserForm userData={userData} setUserData={setUserData} />
        <section className="separator-line"></section>

        <div className="h2-title-div">
          <h2 className="your-dogs-title">Your Dogs</h2>
        </div>

        {dogs.map((dog, index) => (
          <DogForm key={index} dog={dog} index={index} setDogs={setDogs} />
        ))}

        <section className="separator-line"></section>

        <section className="flex-column align-center">
          <AddNewDogButton onAddNewDogClick={handleAddNewDogClick} />
        </section>

        <div className="submit-button-container flex-row align-center">
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateProfile;
