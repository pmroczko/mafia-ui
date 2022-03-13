import { Button } from "react-bootstrap";
import MafiaService from "../../services/MafiaService";

function MafiaButton({ label, func, args, customClass, isDisabled }) {
  function onClick() {
    console.log("calling" + func);
    MafiaService[func](...(args || []));
  }

  var cls = "mafia-button" + (customClass ? ` ${customClass}` : "");

  if (isDisabled) {
    cls += ' mafia-button-disabled'
  }

  if (isDisabled) {
    return (
      <Button onClick={onClick} className={cls} disabled>
        {label}
      </Button>
    );

  }

  return (
    <Button onClick={onClick} className={cls} >
      {label}
    </Button>
  );
}
export default MafiaButton;
