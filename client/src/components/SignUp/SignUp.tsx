import React, {useState} from "react";
import {saveUserAndDogs} from "../../hooks/useCurrentUserAndDogs";
import {Dog} from "../../Interface";
import {AddNewDogButton} from "../AddNewDogButton/AddNewDogButton";
import {toast} from "react-toastify";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import styles from "./SignUp.module.css";
import PreviewImage from "../PreviewImage/PreviewImage";

const SignUp: React.FC = () => {
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
    const {name, value} = e.target;
    setUserData((prev) => ({...prev, [name]: value}));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          profilePicture: reader.result as string, // Save the base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDogChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {name, value} = e.target;
    setDogs((prevDogs) =>
      prevDogs.map((dog, i) => (i === index ? {...dog, [name]: value} : dog))
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
            i === index ? {...dog, dogPicture: reader.result as string} : dog
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
      toast.success("User and Dogs saved successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? `Error: ${error.message}`
          : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer1}>
      <div className={styles.signupContainer}>
        <h2 className={styles.signupTitle}>Create user</h2>

        <div className={styles.formSection}>
          <h3>User Information</h3>
          <section className="seperator-line"></section>
        
    
        <div className="row">
          <InputField
            variant="Text input"
            label="Username"
            name="username"
            placeholder="Enter your username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <InputField
            variant="Email"
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <InputField
            variant="Password"
            label="Password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <InputField
            variant="First name"
            label="First Name"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <InputField
            variant="Last name"
            label="Last Name"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex-row">
          <div className="fileUpload">
            <label htmlFor="profile-picture-input">Profile Picture</label>
            <input
              type="file"
              id="profile-picture-input"
              name="profile-picture-input"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
            {userData.profilePicture && (
              <PreviewImage
                src={userData.profilePicture}
                alt="Profile Picture"
              />
            )}
          </div>
        </div>
    
        <h3>Dogs</h3>
        <section className="seperator-line"></section>
        {dogs.map((dog, index) => (
          <div key={index}>
            <div className="row">
              <InputField
                variant="Dog name"
                label="Dog Name"
                name="name"
                value={dog.name}
                onChange={(e) => handleDogChange(index, e)}
              />
            </div>
            <div className="row">
              <InputField
                variant="Text input"
                placeholder="Breed"
                label="Breed"
                name="race"
                value={dog.race || ""}
                onChange={(e) => handleDogChange(index, e)}
              />
            </div>
            <div className="row">
              <InputField
                variant="Date"
                label="Birth Date"
                name="dogBirthDate"
                value={
                  dog.dogBirthDate
                    ? new Date(dog.dogBirthDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => handleDogChange(index, e)}
              />
            </div>
            <div className="flex-row">
              <div className="fileUpload">
                <label htmlFor="profile-picture-input">Dog Picture:</label>
                <input
                  type="file"
                  id="dog-picture-input"
                  name="dog-profile-picture-input"
                  accept="image/*"
                  onChange={(e) => handleDogPictureChange(index, e)}
                />
                {dog.dogPicture && (
                  <PreviewImage src={dog.dogPicture} alt="Profile Picture" />
                )}
              </div>
            </div>
            
            <AddNewDogButton
              label="Remove Dog"
              iconType="remove"
              onClick={() => handleRemoveDog(index)}
            />
          </div>
        ))}
        <AddNewDogButton
          label="Add Another Dog"
          iconType="add"
          onClick={handleAddDog}
        />
      </div>

      <Button
        label={loading ? "Saving..." : "Save"}
        variant="primary"
        onClick={handleSubmit}
        className={styles.submitButton}
      />
    </div>
     </div>
  );
};

export default SignUp;
