import { Link } from "react-router-dom";

function FeaturedEvent() {
  return (
    <Link to="/test">
      <div className="featured flex-row gap-40">
        <div className="featured-graphic">
          <img src="/assets/event-1.png" alt="Highlight photo" />
          <div className="overlay"></div>
          <h1 className="color-white">Hundetræning i hundeskoven</h1>
        </div>
        <div
          style={{ maxWidth: "400px" }}
          className="flex-column gap-10 align-baseline"
        >
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
