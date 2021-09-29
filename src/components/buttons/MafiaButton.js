import { Button } from "react-bootstrap";
import MafiaService from "../../services/MafiaService";

function MafiaButton({ label, func, args, customClass }) {
  function onClick() {
    console.log("calling" + func);
    MafiaService[func](...(args || []));
  }

  var cls = "mafia-button" + (customClass ? ` ${customClass}` : "");

  return (
    <Button onClick={onClick} className={cls}>
      {label}
    </Button>
  );
}
export default MafiaButton;
