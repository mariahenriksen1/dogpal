import React, { useState } from "react";
import styles from "./InputField.module.css";

type InputFieldProps = {
  variant: string;
  label?: string;
  placeholder?: string;
  value: string;
  icon?: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  icon,
  variant,
  ...inputProps
}) => {
  // Define internal state for each variant (for demonstration)
  const [internalValue, setInternalValue] = useState("");

  const handleInternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
  };

  const getVariantProps = () => {
    switch (variant) {
      case "Text input":
        return {
          label: inputProps.label,
          type: "text",
          placeholder: inputProps.placeholder,
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      case "First name":
        return {
          label: "First name",
          type: "text",
          placeholder: "Enter your first name",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      case "Last name":
        return {
          label: "Last name",
          type: "text",
          placeholder: "Enter your last name",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      case "Dog name":
        return {
          label: "Dog name",
          type: "text",
          placeholder: "Enter your dog's name",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      case "Email":
        return {
          label: "E-mail",
          type: "email",
          placeholder: "Enter your email",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      case "Date":
        return {
          label: "Date of Birth",
          type: "date",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      case "Password":
        return {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      default:
        return {};
    }
  };

  const variantProps = getVariantProps();

  return (
    <div className={styles.input}>
      {variantProps.label && (
        <label className={styles.inputLabel}>{variantProps.label}</label>
      )}
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          {...variantProps}
          {...inputProps} // Allow parent props to override
        />
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
    </div>
  );
};

export default InputField;
