import { Button } from "react-bootstrap";
import MafiaService from "../../services/MafiaService";

function MafiaButton({ label, func, args, isBig }) {
  function onClick() {
    console.log("calling" + func);
    MafiaService[func](...(args || []));
  }

  return (
    <Button
      onClick={onClick}
      className={"mafia-button" + (isBig ? " mafia-button-big" : "")}
    >
      {" "}
      {label}
    </Button>
  );
}
export default MafiaButton;
