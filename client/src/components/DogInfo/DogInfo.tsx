import styles from "./DogInfo.module.css";
import { IDog } from "../../interfaces.ts";
import { useState } from "react";

interface DogInfoProps {
  dog: IDog;
  variant: "Dog info" | "Detailed dog info";
}

export default function DogInfo({ dog, variant }: DogInfoProps) {
  const dogDefault = "../../assets/dogDefault.png";
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.dogItem}>
      <img
        className={styles.dogPicture}
        src={imageError ? dogDefault : dog.image}
        alt={`${dog.name} picture`}
        onError={() => setImageError(true)}
      />
      <p className={styles.dogName}>{dog.name}</p>
      {variant === "Detailed dog info" && (
        <>
          <p className={styles.dogName}>{dog.age}</p>
          <p className={styles.dogName}>{dog.breed}</p>
        </>
      )}
    </div>
  );
}
