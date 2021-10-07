import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import MessageController from "../../controllers/MessageController";
import MafiaService from "../../services/MafiaService";

const GameDay = ({ publicState, playerState }) => {
  const [modalShow, setModalShow] = useState(false);

  function lynchMe() {
    MafiaService.LynchMe(playerState.Position, (resp) => {
      if (resp.status === 200) {
        MessageController.ShowInfo(`Lynched self..`);
      }
    });
  }

  return (
    <div>
      <Button onClick={lynchMe} className='mafia-button'>
        {" "}
        Lynch me.{" "}
      </Button>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Body>
          {playerState.Description.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </Modal.Body>
      </Modal>
      <div className='mafia-button-footer'>
        <Button onClick={() => setModalShow(true)} className='mafia-button'>
          {" "}
          ?{" "}
        </Button>
      </div>
    </div>
  );
};

export default GameDay;
