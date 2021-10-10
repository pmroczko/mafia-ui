import { Button, Modal } from "react-bootstrap";
import MessageController from "../../controllers/MessageController";
import ButtonClasses from "../../enums/ButtonClasses";
import MafiaService from "../../services/MafiaService";
import DataController from "../../controllers/DataController";
import Footer from "../../components/Footer";

const GameDay = ({ publicState, playerState }) => {
  function lynchMe() {
    MafiaService.LynchMe(playerState.Position, (resp) => {
      if (resp.status === 200) {
        MessageController.ShowInfo(`Lynched self..`);
      }
    });
  }

  const ShowInfo = () => {
    DataController.ShowModalInfo("HELLOW");
  };

  const buttons = [
    {
      text: "?",
      callback: () => ShowInfo(),
    },
  ];

  return (
    <div className='mafia-container'>
      <Button onClick={lynchMe} className={ButtonClasses.BigCentered}>
        Lynch me!
      </Button>

      <Footer buttons={buttons} />
    </div>
  );
};

export default GameDay;
