import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  label: string;
  variant: "primary" | "secondary" | "transparent";
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ label, variant, icon, onClick, className }) => {
  const buttonClass =
      variant === "primary"
          ? styles.primary
          : variant === "secondary"
              ? styles.secondary
              : styles.transparent;

  return (
    <button
      className={`${styles.button} ${buttonClass} ${className}`} // Combine buttonClass and className
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>} {label}
    </button>
  );
};

export default Button;
