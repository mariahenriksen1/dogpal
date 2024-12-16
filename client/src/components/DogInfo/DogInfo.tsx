import styles from "./DogInfo.module.css";
import { IDog } from "../../interfaces.ts";
import { useState } from "react";
import PreviewImage from "../PreviewImage/PreviewImage.tsx";

interface DogInfoProps {
  dog: IDog;
  variant: "Dog info" | "Detailed dog info";
  textColor?: string;
  flexDirection?: "row" | "column"; // Add flexDirection prop
  pictureSize?: string; // Add pictureSize prop
}

export default function DogInfo({
  dog,
  variant,
  textColor,
  flexDirection,
}: DogInfoProps) {
  const dogDefault = "../../assets/dogDefault.png";
  const [imageError, setImageError] = useState(false);

  return (
    <section className="flex-row align-center">
      <PreviewImage
        src={imageError ? dogDefault : dog.image}
        alt={`${dog.name} picture`}
        pictureSize="100px" // Use the pictureSize prop or default to "40px"
        onError={() => setImageError(true)}
      />
      <div
        className={styles.dogItem}
        style={{ flexDirection: flexDirection || "row" }}
      >
        <p className={styles.dogName} style={{ color: textColor || "white" }}>
          {dog.name}
        </p>
        {variant === "Detailed dog info" && (
          <>
            <p
              className={styles.dogAge}
              style={{ color: textColor || "white" }}
            >
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
    </section>
  );
}
