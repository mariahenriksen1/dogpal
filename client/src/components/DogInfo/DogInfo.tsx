import styles from "./DogInfo.module.css";
import { IDog } from "../../interfaces.ts";
import { useState } from "react";

interface DogInfoProps {
  dog: IDog;
  variant: "Dog info" | "Detailed dog info";
  textColor?: string;
  pictureSize?: string; // Add pictureSize prop
}

export default function DogInfo({
  dog,
  variant,
  textColor,
  pictureSize,
}: DogInfoProps) {
  const dogDefault = "../../assets/dogDefault.png";
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.dogItem}>
      <img
        className={styles.dogPicture}
        src={imageError ? dogDefault : dog.image}
        alt={`${dog.name} picture`}
        onError={() => setImageError(true)}
        style={{ width: pictureSize, height: pictureSize }} // Apply pictureSize dynamically
      />
      <p className={styles.dogName} style={{ color: textColor || "white" }}>
        {dog.name}
      </p>
      {variant === "Detailed dog info" && (
        <>
          <p className={styles.dogAge} style={{ color: textColor || "white" }}>
            Age: {dog.age}
          </p>
          <p
            className={styles.dogBreed}
            style={{ color: textColor || "white" }}
          >
            Breed: {dog.breed}
          </p>
        </>
      )}
    </div>
  );
}
