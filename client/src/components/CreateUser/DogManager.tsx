import React from "react";
import DogForm from "./DogForm";
import { Dog } from "../../Interface";

interface DogManagerProps {
  dogs: Omit<Dog, "objectId" | "createdAt" | "updatedAt" | "userId">[];
  setDogs: React.Dispatch<React.SetStateAction<Omit<Dog, "objectId" | "createdAt" | "updatedAt" | "userId">[]>>;
}

const DogManager: React.FC<DogManagerProps> = ({ dogs, setDogs }) => {
  const addNewDog = () => {
    setDogs([...dogs, { name: "", dogPicture: "", race: "", dogBirthDate: "" }]);
  };

  return (
    <div>
      <h2>Your Dogs</h2>
      {dogs.map((dog, index) => (
        <DogForm key={index} index={index} dog={dog} setDogs={setDogs} />
      ))}
      <button type="button" onClick={addNewDog}>
        Add New Dog
      </button>
    </div>
  );
};

export default DogManager;
