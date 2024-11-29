import styles from "./HeaderProfile.module.css";

function HeaderProfile() {
  return (
    <div className={styles.headerProfile}>
      <div className={styles.profileDetails}>
        <h2 className="color-white">Mogens Mogensen</h2>
        <div className={styles.dogList}>
          <div className={styles.dogItem}>
            <img
              className={styles.dogPicture}
              src="/assets/dog-picture.jpeg"
              alt="Dog picture"
            />
            <p className="color-white">Maggie</p>
          </div>
          <div className={styles.dogItem}>
            <img
              className={styles.dogPicture}
              src="/assets/dog-picture.jpeg"
              alt="Dog picture"
            />
            <p className="color-white">Charlie</p>
          </div>
        </div>
      </div>
      <img
        className={styles.profilePicture}
        src="/assets/profile-picture.jpeg"
        alt="Profile picture"
      />
    </div>
  );
}

export default HeaderProfile;
