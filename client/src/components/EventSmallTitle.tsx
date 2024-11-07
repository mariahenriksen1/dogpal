import ChevronRight from "../assets/ChevronRight.tsx";

function EventSmallTitle() {
  return (
    <>
      <div className="flex-row space-between gap-20 align-center">
        <div className="flex-row gap-20">
          <div className="flex-column align-center">
            <span
              style={{
                color: "var(--s-dark)",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              SEP
            </span>
            <span
              style={{
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              01
            </span>
          </div>
          <div className="flex-column">
            <span>10:00 - 12:00</span>
            <span style={{ fontSize: "18px" }}>Hundetræning i hundeskoven</span>
          </div>
        </div>
        <ChevronRight />
      </div>
    </>
  );
}

export default EventSmallTitle;
