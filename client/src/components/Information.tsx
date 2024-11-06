import ChevronRight from "../assets/ChevronRight.tsx";
import React from "react";

interface InformationProps {
  icon: string;
  text: string;
  color: string;
}

let iconComponent;
let colorInformation = "--var(black)";

const Information: React.FC<InformationProps> = ({ icon, text, color }) => {
  if (icon == "location") iconComponent = ChevronRight;

  if (color == "white") colorInformation = "var(--white)";
  else colorInformation = color;

  return (
    <div>
      <p style={{ color: colorInformation }}>{text}</p>
    </div>
  );
};

export default Information;
