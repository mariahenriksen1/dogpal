// HeaderProfile.tsx

import styles from "./HeaderProfile.module.css";
import useCurrentPublicUser from "../../hooks/useCurrentPublicUser.ts";
import HeaderDogs from "../HeaderDogs/HeaderDogs.tsx";

function HeaderProfile() {
  const currentPublicUser = useCurrentPublicUser();

  return (
    <div className={styles.headerProfile}>
      <div className={styles.profileDetails}>
        <h2 className="color-white">
          {currentPublicUser
            ? currentPublicUser.get("firstName") +
              " " +
              currentPublicUser.get("lastName")
            : "Loading..."}
        </h2>
        <HeaderDogs />
      </div>
      <img
        className={styles.profilePicture}
        src={
          currentPublicUser && currentPublicUser.get("profilePicture")
            ? currentPublicUser.get("profilePicture")
            : "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
        }
        alt="Profile picture"
      />
    </div>
  );
}

export default HeaderProfile;
