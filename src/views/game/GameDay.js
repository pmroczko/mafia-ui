import { Button, Modal } from "react-bootstrap";
import DataController from "../../controllers/DataController";
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

  function showLynchModal() {
    DataController.ShowModalInfo(
      <div>
        <p>Are you sure?</p>
        <Button onClick={lynchMe}> Yes, kill me! </Button>
      </div>
    )
  }

  return (
    <div className='mafia-container'>
      <Button onClick={showLynchModal} className={ButtonClasses.BigCentered}>
        Lynch me!
      </Button>
    </div>
  );
};

export default GameDay;
