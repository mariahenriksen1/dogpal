import React from "react";

interface AddNewDogButtonProps {
  onAddNewDogClick: () => void;
}

export const AddNewDogButton: React.FC<AddNewDogButtonProps> = ({
  onAddNewDogClick,
}) => {
  return (
    <div className="addNewDog">
      <button className="addNewDogButton" onClick={onAddNewDogClick}>
        <span> + Add new dog</span>
      </button>
    </div>
  );
};
