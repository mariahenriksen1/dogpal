import {useState} from "react";
import {useNavigate} from "react-router-dom";
import DogInfo from "../components/DogInfo/DogInfo.tsx";
import {useUser} from "../context/UserContext";
import profileDefault from "./../assets/profileDefault.png";
import "./Styling/StylingProfile.css";
import Button from "../components/Button/Button.tsx";
import PreviewImage from "../components/PreviewImage/PreviewImage.tsx";
import EventsAttended from "../components/EventsAttended/EventsAttended.tsx";

function Profile() {
  const {publicUser, dogs, loadingDogs} = useUser();
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  if (!publicUser) {
    return <div>Loading...</div>;
  }

  const firstName = publicUser.get("firstName") || "Unknown";
  const lastName = publicUser.get("lastName") || "User";
  const profilePicture = imageError
    ? profileDefault
    : (publicUser.get("profilePicture") as string) || profileDefault;

  const handleEditProfileClick = () => {
    navigate("/editProfile");
  };

  return (
    <>
      <header>
        <section className="profile-section">
          <div className="profile-container">
            <PreviewImage
              src={profilePicture}
              alt="Profile picture"
              onError={() => setImageError(true)}
              border="3px #f9c069 solid"
            />
            <div className="profile-details">
              <h1 className="color-white">{`${firstName} ${lastName}`}</h1>
            </div>
          </div>
        </section>
      </header>

      <main>
        <div className="profile-button-container">
          <div className="h2-title-div">
            <h2 className="yourDogsTitle">Your dogs</h2>
          </div>
          <div className="button-div">
            <Button
              label="Edit profile"
              variant="primary"
              onClick={handleEditProfileClick}
            />
          </div>
        </div>
        <section className="flex-column align-center">
          <div className="dog-container">
            <div className="dog-list">
              {loadingDogs ? (
                <div>Loading...</div>
              ) : (
                dogs.map((dog: any) => (
                  <DogInfo
                    key={dog.objectId}
                    dog={dog}
                    variant="Detailed dog info"
                    textColor="black"
                    flexDirection="column"
                    pictureSize="100px"
                    border="3px #f9c069 solid"
                  />
                ))
              )}
            </div>
          </div>
        </section>

        <section className="seperator-line"></section>

        <section className="flex-column align-center">
          <div className="h2-title-div">
            <h2 className=""> Events you attend</h2>
          </div>
          <EventsAttended/>
        </section>
      </main>
    </>
  );
}

export default Profile;
