import React, { FC } from "react";
import Parse from "../../env.Backend/env.parseConfig";
import Button from "../Button/Button"; 
import styles from "./LogoutButton.module.css";
import { toast } from "react-toastify";

type LogoutProps = {
  onLogoutSuccess?: () => void;
};

const LogoutButton: FC<LogoutProps> = ({ onLogoutSuccess }): React.ReactElement => {
  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      toast.success("Successfully logged out!");
      if (onLogoutSuccess) {
        onLogoutSuccess(); 
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error during logout: ${error.message}`);
      }
    }
  };

  return (
      <Button
        label="Log Out"
        variant="secondary"
        onClick={handleLogout}
        className={styles["logout-button"]} // Custom styling
      />
  );
};

export default LogoutButton;
