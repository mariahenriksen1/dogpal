import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  label: string,
  variant: "primary" | "secondary" | "transparent",
  icon?: React.ReactNode,
  onClick?: () => void,
  className?: string,
  type?: "button" | "submit" | "reset",
  disabled?: boolean
};

const Button: React.FC<ButtonProps> = ({label, variant, icon, onClick, className, type = "button", disabled}) => {
  const buttonClass =
    variant === "primary"
      ? styles.primary
      : variant === "secondary"
        ? styles.secondary
        : styles.transparent;

  return (
    <button
      type={type}
      className={`${className} ${styles.button} ${buttonClass}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>} {label}
    </button>
  );
};

export default Button;
