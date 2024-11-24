import React from "react";
import styles from "./Information.module.css";

interface InformationProps {
  icon?: React.ReactNode;
  text: string;
  color: string;
}

let colorInformation = "--var(black)";

const Information: React.FC<InformationProps> = ({ icon, text, color }) => {
  if (color === "white") colorInformation = "var(--white)";
  else colorInformation = color;

  return (
    <div className={styles.information}>
      {icon && <span>{icon}</span>}
      <p style={{ color: colorInformation }}>{text}</p>
    </div>
  );
};

export default Information;
