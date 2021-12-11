const MafiaInput = ({ referenceField, onChanged, customType }) => {
  const handleChange = (e) => {
    console.log("Input value has changed");
    onChanged && onChanged(e.target.value);
  };
  customType = customType ? customType : "text";
  return (
    <input
      ref={referenceField}
      type={customType}
      className='mafia-input-big'
      onChange={handleChange}
    />
  );
};

export default MafiaInput;
