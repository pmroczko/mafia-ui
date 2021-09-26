const MafiaInput = ({ referenceField }) => {
  const handleChange = (e) => {
    console.log("Input value has changed");
  };
  return (
    <input
      ref={referenceField}
      value={referenceField.current}
      type='text'
      className='mafia-input-big'
      onChange={handleChange}
    />
  );
};
export default MafiaInput;
