

function InfoLabel({ isDay, dayNumber, aliveCnt, secondsLeft }) {
  return (
    <div className='mafia-info-label'>
      <h1>
        {isDay ? "Day" : "Night"} {dayNumber + 1}
        {" "}
        {"Alive: " + aliveCnt}
        {" "}
        {secondsLeft > 0 ? "Time: " + secondsLeft : ""}
      </h1>
    </div>
  );
}

export default InfoLabel;
