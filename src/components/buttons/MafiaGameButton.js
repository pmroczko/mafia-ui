import { Button } from "react-bootstrap";
import ButtonClasses from "../../enums/ButtonClasses";
function MafiaGameButton({ text, callback, customClass }) {
  const _customClass = customClass ? customClass: "";
  return (
    <td>
      <Button
        onClick={callback}
        className={`mafia-button ${ButtonClasses.Flat} ${_customClass}`}
      >
        {text}
      </Button>
    </td>
  );
}

export default MafiaGameButton;
