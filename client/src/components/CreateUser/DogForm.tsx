import React from "react";
import PreviewImage from "../PreviewImage/PreviewImage";

interface DogFormProps {
  dog: { name: string; dogPicture: string; race: string; dogBirthDate: string };
  index: number;
  setDogs: React.Dispatch<React.SetStateAction<any>>;
}

const DogForm: React.FC<DogFormProps> = ({ dog, index, setDogs }) => {
  const handleDogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDogs((prevDogs: any[]) =>
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
          i === index ? { ...d, dogPicture: reader.result as string } : d
        )
      );
    };
    reader.readAsDataURL(file);
  };

  return (
    <section>
      <div className="flex-row gap-20">
        <div className="dog-profile-picture">
          <label htmlFor={`dog-picture-${index}`}>Dog Profile Picture</label>
          <input
            type="file"
            id={`dog-picture-${index}`}
            name="dogPicture"
            accept="image/*"
            onChange={handleImageChange}
          />
          {dog.dogPicture && (
            <img
              src={dog.dogPicture}
              alt="Dog Profile Picture"
              className="dog-profile-picture-preview"
            />
          )}
        </div>

        <div className="profile-form-inputs">
          <div className="row">
            <div className="input">
              <label className="input-label">Dog Name</label>
              <input
                type="text"
                name="name"
                className="input-field"
                value={dog.name}
                onChange={handleDogChange}
                placeholder="Enter dog's name"
              />
            </div>
          </div>
          <div className="row">
            <div className="input">
              <label className="input-label">Dog Race</label>
              <input
                type="text"
                name="race"
                className="input-field"
                value={dog.race}
                onChange={handleDogChange}
                placeholder="Enter breed"
              />
            </div>
          </div>
          <div className="row">
            <div className="input">
              <label className="input-label">Date of Birth</label>
              <input
                type="date"
                name="dogBirthDate"
                className="input-field"
                value={dog.dogBirthDate}
                onChange={handleDogChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DogForm;
