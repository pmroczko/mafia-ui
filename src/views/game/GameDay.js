import { Button, Modal } from "react-bootstrap";
import MessageController from "../../controllers/MessageController";
import ButtonClasses from "../../enums/ButtonClasses";
import MafiaService from "../../services/MafiaService";

const GameDay = ({ playerState }) => {
  function lynchMe() {
    MafiaService.LynchMe(playerState.Position, (resp) => {
      if (resp.status === 200) {
        MessageController.ShowInfo(`Lynched self..`);
      }
    });
  }

  return (
    <div className='mafia-container'>
      <Button onClick={lynchMe} className={ButtonClasses.BigCentered}>
        Lynch me!
      </Button>
    </div>
  );
};

export default GameDay;
