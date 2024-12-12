import React, { useState } from "react";
import styles from "./InputField.module.css";
import { FiLock, FiMail } from "react-icons/fi";

type InputFieldProps = {
  variant: string;
  label?: string;
  placeholder?: string;
  value: string;
  icon?: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  labelTextColor?: string;
  type?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  icon,
  variant,
  labelTextColor,
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
          name: "text",
          type: "text",
          placeholder: inputProps.placeholder,
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      case "First name":
        return {
          label: "First name",
          name: "firstName",
          type: "text",
          placeholder: "Enter your first name",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      case "Last name":
        return {
          label: "Last name",
          name: "lastName",
          type: "text",
          placeholder: "Enter your last name",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      case "Dog name":
        return {
          label: "Dog name",
          name: "dogName",
          type: "text",
          placeholder: "Enter your dog's name",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      case "Email":
        return {
          label: "E-mail",
          name: "email",
          type: "email",
          placeholder: "Enter your email",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
          icon: <FiMail />,
        };
      case "Date":
        return {
          label: "Date of Birth",
          name: "birthDate",
          type: "date",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      case "Password":
        return {
          label: "Password",
          name: "password",
          type: "password",
          placeholder: "Enter your password",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
          icon: <FiLock />,
        };
      default:
        return {};
    }
  };

  const variantProps = getVariantProps();

  return (
    <div className={styles.input}>
      {variantProps.label && (
        <label
          className={styles.inputLabel}
          style={{ color: labelTextColor || "inherit" }} // Apply labelTextColor dynamically
        >
          {variantProps.label}
        </label>
      )}
      <div className={styles.inputcontainer}>
        <input
          className={styles.inputfield}
          {...variantProps}
          {...inputProps} // Allow parent props to override
        />
       {variantProps.icon && (
        <span className={styles.icon}>{variantProps.icon}</span>
      )}
      {icon && (
        <span className={styles.icon}>{icon}</span>
      )}
    </div>
  </div>
);
};
export default InputField;
