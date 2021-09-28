import { Button } from "react-bootstrap";
import ButtonClasses from "../../enums/ButtonClasses";
function MafiaGameButton({ text, callback }) {
  return (
    <td>
      <Button
        onClick={callback}
        className={`mafia-button ${ButtonClasses.Flat}`}
      >
        {text}
      </Button>
    </td>
  );
}

export default MafiaGameButton;
