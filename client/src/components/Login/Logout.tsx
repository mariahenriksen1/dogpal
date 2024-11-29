import React, { FC } from "react";
import Parse from "../../env.Backend/env.parseConfig";
import Button from "../Button/Button"; 

type LogoutProps = {
  onLogoutSuccess?: () => void; 
};

const Logout: FC<LogoutProps> = ({ onLogoutSuccess }): React.ReactElement => {
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
      />
    </div>
  );
};

export default Logout;
