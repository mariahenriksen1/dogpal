import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  label: string;
  variant: "primary" | "secondary";
  icon?: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, variant, icon, onClick }) => {
  const buttonClass = variant === "primary" ? styles.primary : styles.secondary;

  return (
    <button className={`${styles.button} ${buttonClass}`} onClick={onClick}>
      {icon && <span className={styles.icon}>{icon}</span>} {label}
    </button>
  );
};

export default Button;
