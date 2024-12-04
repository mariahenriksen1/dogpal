import React from "react";
import styles from "./AddNewDogButton.module.css";


interface AddNewDogButtonProps {
  onAddNewDogClick: () => void;
}

export const AddNewDogButton: React.FC<AddNewDogButtonProps> = ({
  onAddNewDogClick,
}) => {
  return (
    <div className={styles.addNewDog}>
      <button className={styles.addNewDogButton} onClick={onAddNewDogClick}>
        <span> + Add new dog</span>
      </button>
    </div>
  );
};
