import CacheController from "../controllers/CacheController";

function InfoLabel({ isDay, dayNumber }) {
  return (
    <div className='mafia-info-label'>
      <h1>
        {CacheController.GetPlayerName()}
        {isDay ? " Day" : " Night"} {dayNumber + 1}
      </h1>
    </div>
  );
}

export default InfoLabel;
