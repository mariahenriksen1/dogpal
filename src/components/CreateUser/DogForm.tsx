import React from "react";
import PreviewImage from "../PreviewImage/PreviewImage.tsx";
import InputField from "../InputField/InputField.tsx";
import {Dog} from "../../Interface.ts";

interface DogFormProps {
  index: number;
  dog: Omit<Dog, "objectId" | "createdAt" | "updatedAt" | "userId">;
  setDogs: React.Dispatch<React.SetStateAction<Omit<Dog, "objectId" | "createdAt" | "updatedAt" | "userId">[]>>;
}

const DogForm: React.FC<DogFormProps> = ({index, dog, setDogs}) => {
  /*const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDogs((prevDogs) =>
      prevDogs.map((d, i) => (i === index ? { ...d, [name]: value } : d))
    );
  };*/

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setDogs((prevDogs: any[]) =>
        prevDogs.map((d, i) =>
          i === index ? {...d, picture: reader.result as string} : d
        )
      );
    };
    reader.readAsDataURL(file);
  };

  return (
    <section>
      <div className="flex-row">
        <div className="dog-profile-picture">
          <label htmlFor={`dog-profile-picture-input-${index}`}>
            Dog Profile Picture
          </label>
          <input
            type="file"
            id={`dog-profile-picture-input-${index}`}
            name="dog-profile-picture-input"
            accept="image/*"
            onChange={handleImageChange}
          />
          {dog.dogPicture && (
            <PreviewImage src={dog.dogPicture} alt="Dog picture preview"/>
          )}
        </div>
        <div className="profile-form-inputs">
          <div className="row">
            <InputField
              variant="Dog name"
              value={dog.name}
              onChange={handleDogChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Date"
              value={String(dog.dogBirthDate)}
              onChange={handleDogChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Text input"
              name="breed"
              label="Breed"
              placeholder="Enter your dog's breed"
              value={dog.race || ''}
              onChange={handleDogChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DogForm;
