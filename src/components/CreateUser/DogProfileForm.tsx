import React, { useState } from "react";
import InputField from "../InputField/InputField.tsx";
import PreviewImage from "../PreviewImage/PreviewImage.tsx";
import { AddNewDogButton } from "../AddNewDogButton/AddNewDogButton.tsx";
import { Dog } from "../../Interface.ts";

interface DogProfileFormProps {
  dog: Dog;
  index: number;
  handleDogChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleDogPictureChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRemoveDog: (index: number) => void;
}

const DogProfileForm: React.FC<DogProfileFormProps> = ({
  dog,
  index,
  handleDogChange,
  handleDogPictureChange,
  handleRemoveDog,
}) => {
  const [imageError, setImageError] = useState(false);

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
            name={`dog-profile-picture-input-${index}`}
            accept="image/*"
            onChange={(e) => handleDogPictureChange(index, e)}
          />
          {dog.dogPicture && (
            <PreviewImage
              src={dog.dogPicture}
              alt="Dog Profile Picture"
              onError={() => setImageError(true)}
              border="3px #f9c069 solid"
            />
          )}
        </div>

        <div className="profile-form-inputs">
          <div className="row">
            <InputField
              variant="Dog name"
              name="name"
              value={dog.name}
              placeholder={dog.name || "Dog Name"}
              onChange={(e) => handleDogChange(index, e)}
            />
          </div>
          <div className="row">
            <InputField
              variant="Breed"
              name="breed"
              value={dog.race || ""}
              placeholder={dog.race || "Breed"}
              onChange={(e) => handleDogChange(index, e)}
            />
          </div>
          <div className="row">
            <InputField
              variant="Date"
              name="birthDate"
              value={dog.dogBirthDate ? dog.dogBirthDate.toString() : ""}
              placeholder={
                dog.dogBirthDate ? dog.dogBirthDate.toString() : "Birth Date"
              }
              onChange={(e) => handleDogChange(index, e)}
            />
          </div>
          <div className="flex-row align-center">
            <AddNewDogButton
              label="Remove Dog"
              iconType="remove"
              onClick={() => handleRemoveDog(index)}
            />
          </div>
        </div>
      </div>
      <section className="seperator-line"></section>
    </section>
  );
};

export default DogProfileForm;
