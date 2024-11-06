import { Link } from "react-router-dom";
import Information from "./Information.tsx";

function FeaturedEvent() {
  return (
    <Link to="/test">
      <div className="featured flex-row gap-40">
        <div className="featured-graphic">
          <img src="/assets/event-1.png" alt="Highlight photo" />
          <div className="overlay flex-column gap-20 justify-end">
            <h1 className="color-white">Hundetræning i hundeskoven</h1>
            <div className="featured-information flex-row gap-20">
              <Information
                icon="location"
                text="Oct 12, 12:00-15:00"
                color="white"
              />
              <Information icon="date" text="Brøndby Hundeskov" color="white" />
            </div>
          </div>
        </div>
        <div
          style={{ maxWidth: "400px" }}
          className="flex-column gap-10 align-baseline"
        >
          <div className="featured-information flex-row gap-20">
            <Information icon="money" text="Free" color="black" />
            <Information icon="user" text="Mogens Mogensen" color="black" />
          </div>
          <p>
            Alle hunde er velkomne uanset erfaring og niveau. Husk at medbringe
            godbidder, vand og masser af energi! Vi glæder os til en sjov og
            lærerig dag i hundeskoven.
          </p>
        </div>
      </div>
    </Link>
  );
}

export default FeaturedEvent;
