import { Button } from "react-bootstrap";
import MafiaService from "../../services/MafiaService";

function MafiaButton({ label, func, args, isBig, customClass }) {
  function onClick() {
    console.log("calling" + func);
    MafiaService[func](...(args || []));
  }

  var cls = "mafia-button" + (isBig ? " mafia-button-big" : "");
  cls += customClass ? " " + customClass : "";

  return (
    <Button onClick={onClick} className={cls}>
      {" "}
      {label}
    </Button>
  );
}
export default MafiaButton;
