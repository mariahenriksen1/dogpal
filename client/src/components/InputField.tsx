import React, { useState } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  variant?:
    | "First name"
    | "Last name"
    | "Dog name"
    | "Email"
    | "Date"
    | "Password"; // Define variants
}

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
      case "First name":
        return {
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      case "Last name":
        return {
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
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
          icon: <div className="email-icon" />,
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
          icon: <div className="password-icon" />,
          value: inputProps.value ?? internalValue,
          onChange: inputProps.onChange ?? handleInternalChange,
        };
      default:
        return {};
    }
  };

  const variantProps = getVariantProps();

  return (
    <div className="input">
      {variantProps.label && (
        <label className="input-label">{variantProps.label}</label>
      )}

      {icon || variantProps.icon ? (
        <span className="icon">{icon || variantProps.icon}</span>
      ) : null}
      <input
        className="input-field"
        {...variantProps}
        {...inputProps} // Allow parent props to override
      />
    </div>
  );
};

export default InputField;
