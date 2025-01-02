import {useState} from "react";
import PreviewImage from "../PreviewImage/PreviewImage";
import styles from "./DogInfo.module.css";
import {Dog, getDogAge} from "../../Interface";

interface DogInfoProps {
  dog: Dog; // Accept a single dog as a prop
  variant: "Dog info" | "Detailed dog info";
  textColor?: string;
  flexDirection?: "row" | "column"; // Add flexDirection prop
  pictureSize?: string; // Add pictureSize prop
  border?: string; // Add border prop
}

export default function DogInfo({
                                  dog,
                                  variant,
                                  textColor,
                                  flexDirection,
                                  pictureSize,
                                  border,
                                }: DogInfoProps) {
  const dogDefault = "../../assets/dogDefault.png";
  const [imageError, setImageError] = useState(false);

  if (!dog) {
    console.error("Dog object is undefined");
    return null;
  }

  const imageUrl = imageError ? dogDefault : dog.dogPicture || dogDefault;

  return (
    <div key={dog.objectId} className={styles.dogItem}>
      <PreviewImage
        src={imageUrl}
        alt={`${dog.name} picture`}
        onError={() => {
          console.error(`Error loading image for ${dog.name}`);
          setImageError(true);
        }}
        pictureSize={pictureSize} // Pass pictureSize prop
        border={border} // Pass border prop
      />
      <div
        className={styles.dogItem}
        style={{flexDirection: flexDirection || "row"}}
      >
        <p className={styles.dogName} style={{color: textColor || "white"}}>
          {dog.name}
        </p>
        {variant === "Detailed dog info" && (
          <>
            <p
              className={styles.dogAge}
              style={{color: textColor || "white"}}
            >
              Age: {getDogAge(dog)}
            </p>
            <p
              className={styles.dogBreed}
              style={{color: textColor || "white"}}
            >
              Breed: {dog.race}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
