import { Button } from "react-bootstrap";
import PlayerLabel from "../../components/PlayerLabel";
import DataController from "../../controllers/DataController";
import MessageController from "../../controllers/MessageController";
import ButtonClasses from "../../enums/ButtonClasses";
import MafiaService from "../../services/MafiaService";

const GameDay = ({ playerView, serverId }) => {
  function lynchMe() {
    MafiaService.LynchMe(serverId, playerView.Position, (data) => {
      MessageController.ShowInfo(`Lynched self..`);
    });
  }

  function showLynchModal() {
    DataController.ShowModalConfirm("Are you sure?", "Yes, kill me!", lynchMe);
  }

  const getPlayerList = () => {
    const playerList = [];
    const isSmall = playerView.PlayersState.length > 12;
    for (var i in playerView.PlayersState) {
      const p = playerView.PlayersState[i];
      playerList.push(<PlayerLabel key={p.Position} player={p} isSmall={isSmall} />)
    }
    return playerList;
  }

  return (
    <div className='mafia-container'>
      <div className="mafia-labels-container">
        {getPlayerList()}
      </div>
      <Button onClick={showLynchModal} className={ButtonClasses.Big}>
        Lynch me!
      </Button>
    </div>
  );
};

export default GameDay;
