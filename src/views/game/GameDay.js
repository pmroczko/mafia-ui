import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import MessageController from "../../controllers/MessageController";
import ButtonClasses from "../../enums/ButtonClasses";
import MafiaService from "../../services/MafiaService";
import DataController from "../../controllers/DataController";

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

  return (
    <div className='mafia-container'>
      <Button onClick={lynchMe} className={ButtonClasses.BigCentered}>
        Lynch me!
      </Button>
      <div className='mafia-button-footer'>
        <Button onClick={() => ShowInfo()} className='mafia-button'>
          ?
        </Button>
      </div>
    </div>
  );
};

export default GameDay;
