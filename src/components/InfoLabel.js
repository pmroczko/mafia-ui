function InfoLabel({ isDay, dayNumber }) {
  return (
    <div className='mafia-info-label'>
      <h1>
        {isDay ? "Day" : "Night"} {dayNumber}
      </h1>
    </div>
  );
}

export default InfoLabel;
