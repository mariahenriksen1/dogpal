import React from "react";
import { Dog } from "../../Interface";

interface DogFormProps {
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
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDogs((prevDogs) =>
          prevDogs.map((d, i) =>
            i === index ? { ...d, dogPicture: reader.result as string } : d
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3>Dog #{index + 1}</h3>
      <input
        type="text"
        placeholder="Dog Name"
        name="name"
        value={dog.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Race"
        name="race"
        value={dog.race}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="dogBirthDate"
        value={dog.dogBirthDate ? new Date(dog.dogBirthDate).toISOString().split('T')[0] : ''}
        onChange={handleInputChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {dog.dogPicture && <img src={dog.dogPicture} alt="Dog Preview" />}
    </div>
  );
};

export default DogForm;
