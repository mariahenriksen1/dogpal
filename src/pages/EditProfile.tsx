import React from "react";
import { useUser } from "../context/UserContext.tsx";
import ProfileForm from "../components/CreateUser/ProfileForm.tsx";

const EditProfile: React.FC = () => {
  const handleSave = async () => {
    // Save changes logic
    console.log("Save Changes");
  };

  return (
    <>
      <header>
        <section>
          <div className="flex-row space-between">
            <h1 className="color-white">Profile</h1>
          </div>
        </section>
      </header>

      <ProfileForm />
    </>
  );
};

export default EditProfile;
