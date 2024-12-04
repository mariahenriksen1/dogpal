import styles from "./HeaderDog.module.css";
import { IDog } from "../../interfaces.ts";
import { useState } from "react";

interface HeaderDogProps {
  dog: IDog;
}

export default function HeaderDog({ dog }: HeaderDogProps) {
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
    </div>
  );
}
