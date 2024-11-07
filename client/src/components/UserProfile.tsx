function UserProfile() {
  return (
    <div className="flex-row gap-20 align-center">
      <div className="flex-column gap-10">
        <h2 className="color-white">Mogens Mogensen</h2>
        <div className="flex-row gap-20">
          <div className="flex-row gap-10">
            <img
              className="dog-picture"
              src="/assets/dog-picture.jpeg"
              alt="Dog picture"
            />
            <p className="color-white">Maggie</p>
          </div>
          <div className="flex-row gap-10">
            <img
              className="dog-picture"
              src="/assets/dog-picture.jpeg"
              alt="Dog picture"
            />
            <p className="color-white">Charlie</p>
          </div>
        </div>
      </div>
      <img
        className="profile-picture"
        src="/assets/profile-picture.jpeg"
        alt="Profile picture"
      />
    </div>
  );
}

export default UserProfile;
