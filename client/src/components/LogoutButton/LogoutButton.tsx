import React, { FC } from "react";
import Parse from "../../env.Backend/env.parseConfig";
import Button from "../Button/Button"; 
import styles from "./LogoutButton.module.css";

type LogoutProps = {
  onLogoutSuccess?: () => void; 
};

const LogoutButton: FC<LogoutProps> = ({ onLogoutSuccess }): React.ReactElement => {
  const handleLogout = async () => {
    try {
      await Parse.User.logOut(); 
      alert("Successfully logged out!");
      if (onLogoutSuccess) {
        onLogoutSuccess();
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error during logout: ${error.message}`);
      }
    }
  };

  return (
    <div>
      
        <Button
          label="Log Out"
          variant="secondary"
          onClick={handleLogout}
          className={styles["logout-button"]} 
        />
      </div>
    
  );
};

export default LogoutButton;
