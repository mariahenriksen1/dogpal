import React from "react";
import Button from "../Button/Button";
import { FaPlus, FaMinus } from "react-icons/fa";

interface AddNewDogButtonProps {
  label: string;
  onClick: () => void;
  iconType: "add" | "remove"; // Define icon type dynamically
}

export const AddNewDogButton: React.FC<AddNewDogButtonProps> = ({
  label,
  onClick,
  iconType,
}) => {
  // Determine icon based on type
  const icon = iconType === "add" ? <FaPlus /> : <FaMinus />;

  return (
    <div className="dogActionButton">
      <Button
        label={label}
        variant="secondary"
        icon={icon}
        onClick={onClick}
      />
    </div>
  );
};
