import React from "react";
import PreviewImage from "../PreviewImage/PreviewImage";
import InputField from "../InputField/InputField";

interface DogFormProps {
  dog: { name: string; picture: string; breed: string; birthDate: string };
  index: number;
  dog: Omit<Dog, "objectId" | "createdAt" | "updatedAt" | "userId">;
  setDogs: React.Dispatch<React.SetStateAction<Omit<Dog, "objectId" | "createdAt" | "updatedAt" | "userId">[]>>;
}

const DogForm: React.FC<DogFormProps> = ({ index, dog, setDogs }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDogs((prevDogs) =>
      prevDogs.map((d, i) => (i === index ? { ...d, [name]: value } : d))
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setDogs((prevDogs: any[]) =>
        prevDogs.map((d, i) =>
          i === index ? { ...d, picture: reader.result as string } : d
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
          {dog.picture && (
            <PreviewImage src={dog.picture} alt="Dog picture preview" />
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
              value={dog.birthDate}
              onChange={handleDogChange}
            />
          </div>
          <div className="row">
            <InputField
              variant="Text input"
              name="breed"
              label="Breed"
              placeholder="Enter your dog's breed"
              value={dog.breed}
              onChange={handleDogChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DogForm;
