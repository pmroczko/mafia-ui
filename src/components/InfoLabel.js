import CacheController from "../controllers/CacheController";

function InfoLabel({ isDay, dayNumber, secondsLeft }) {
  return (
    <div className='mafia-info-label'>
      <h1>
        {isDay ? " Day" : " Night"} {dayNumber + 1}
        {" - " + CacheController.GetPlayerName()}
        {" "}
        {secondsLeft > 0 ? secondsLeft : ""}
      </h1>
    </div>
  );
}

export default InfoLabel;
