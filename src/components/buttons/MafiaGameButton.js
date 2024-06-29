import { Button } from "react-bootstrap";
import ButtonClasses from "../../enums/ButtonClasses";
function MafiaGameButton({ text, callback, customClass, isDisabled }) {
  const _customClass = customClass ? customClass : "";
  const _isDisabled = isDisabled ? isDisabled : false
  return (
    <td>
      <Button
        onClick={callback}
        className={`mafia-button ${ButtonClasses.Flat} ${_customClass}`}
        disabled={_isDisabled}
      >
        {text}
      </Button>
    </td>
  );
}

export default MafiaGameButton;
