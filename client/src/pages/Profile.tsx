import { ProfileForm } from "../components/ProfileForm";
import { DogProfileForm } from "../components/DogProfileForm";

function Profile() {
  return (
    <div>
      <h1>Your profile</h1>
      <ProfileForm />
      <h1>Your dogs</h1>
      <DogProfileForm />
    </div>
  );
}

export default Profile;
