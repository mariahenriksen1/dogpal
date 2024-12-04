import React from "react";
import Button from "./Button/Button";
import { FaPlus } from "react-icons/fa";

interface AddNewDogButtonProps {
  onAddNewDogClick: () => void;
}

export const AddNewDogButton: React.FC<AddNewDogButtonProps> = ({
  onAddNewDogClick,
}) => {
  return (
    <div className="addNewDog">
      <Button
        label="Add new dog"
        variant="secondary"
        icon={<FaPlus />} // Pass an icon for the button
        onClick={onAddNewDogClick}
      />
    </div>
  );
};
