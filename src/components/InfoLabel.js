import CacheController from "../controllers/CacheController";

function InfoLabel({ isDay, dayNumber, aliveCnt, secondsLeft }) {
  return (
    <div className='mafia-info-label'>
      <h1>
        {isDay ? "Day" : "Night"} {dayNumber + 1}
        {" "}
        {"Alive: " + aliveCnt}
        {" "}
        {"Time: " + (secondsLeft > 0 ? secondsLeft : "")}
      </h1>
    </div>
  );
}

export default InfoLabel;
