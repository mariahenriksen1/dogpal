import { ProfileForm } from "../components/ProfileForm";
import { DogProfileForm } from "../components/DogProfileForm";

function Profile() {
  return (
    <div className="profile-div">
      <div className="titleBar">
        <div className="titleRow">
          <div className="titleColumn">
            <div className="titleDiv">
              <h1 className="ProfileTitle">Profile</h1>
            </div>
          </div>
        </div>
        <div className="spacerColumn"></div>
      </div>
      <ProfileForm />
      <div className="titleDiv">
        <h2 className="yourDogsTitle">Your dogs</h2>
      </div>

      <DogProfileForm />
    </div>
  );
}

export default Profile;
