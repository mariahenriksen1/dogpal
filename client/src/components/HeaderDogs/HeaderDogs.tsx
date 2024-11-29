import styles from "../HeaderProfile/HeaderProfile.module.css";

export default function HeaderDogs() {
  return (
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
  );
}
