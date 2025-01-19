import React from "react";
import { useUser } from "../context/UserContext.tsx";
import ProfileForm from "../components/CreateUser/ProfileForm.tsx";
import { useNavigate } from "react-router-dom";
import { Dog } from "../Interface.ts";

const EditProfile: React.FC = () => {
  const { publicUser, setPublicUser, dogs, setDogs } = useUser();
  const navigate = useNavigate();

  const handleProfileFormSubmit = (data: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: string | null;
    dogs: Dog[];
  }) => {
    setPublicUser((prevUser) => ({
      ...prevUser,
      firstName: data.firstName,
      lastName: data.lastName,
      profilePicture: data.profilePicture ?? prevUser?.profilePicture,
      objectId: prevUser?.objectId || "",
      username: prevUser?.username || "",
      userId: prevUser?.userId || "",
      createdAt: prevUser?.createdAt || "",
      updatedAt: prevUser?.updatedAt || "",
    }));
    setDogs(data.dogs);
    navigate("/profile"); // Navigate to profile page after saving
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

      <ProfileForm
        initialData={{
          username: publicUser?.username || "",
          firstName: publicUser?.firstName || "",
          lastName: publicUser?.lastName || "",
          email: publicUser?.firstName + "@email.com" || "",
          password: publicUser?.lastName || "",
          profilePicture: publicUser?.profilePicture || null,
          dogs: dogs || [],
        }}
        onSubmit={handleProfileFormSubmit}
      />
    </>
  );
};

export default EditProfile;
