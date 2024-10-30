
export const DogProfileForm = () => {
    return (
      <form className="profile-form form" action="/action_page.php">
        <div className="form-content">
          <h3>Profile info</h3>
          <div>
            <label htmlFor="email">First name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="email">Last name</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="row">
            <div className="form-element">
              <label htmlFor="address">Email</label>
              <input type="text" id="address" name="address" />
            </div>
            <div>
              <label htmlFor="city">Password</label>
              <input type="text" id="city" name="city" />
              <button disabled>Change password</button>
            </div>
          </div>
        </div>
      </form>
    );
  };