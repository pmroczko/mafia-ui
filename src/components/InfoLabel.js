import CacheController from "../controllers/CacheController";

function InfoLabel({ isDay, dayNumber }) {
  return (
    <div className='mafia-info-label'>
      <h1>
        {isDay ? " Day" : " Night"} {dayNumber + 1}
        {" - " + CacheController.GetPlayerName()}
      </h1>
    </div>
  );
}

export default InfoLabel;
