import MafiaService from "../../services/MafiaService";
import MessageController from "../../controllers/MessageController";
import DataController from "../../controllers/DataController";
import MafiaGameButton from "../../components/buttons/MafiaGameButton";

const GameNight = ({ playerView, arrangement }) => {

  const getPlayerByPos = (pos) => {
    return playerView.PlayersState[pos];
  };

  function addMafiaVote(targetPos) {
    console.log(`Add vote ${targetPos}`);
    const player = getPlayerByPos(targetPos);
    if (!player) {
      MessageController.ShowError("Invalid vote target selected!");
    }
    const cbSuccess = () => {
      MessageController.ShowInfo(`You voted for ${player.Name}`);
    };
    const cbError = () => {
      MessageController.ShowError(`Unable to vote for ${player.Name}`);
    };
    DataController.MafiaVote(
      playerView.Position,
      targetPos,
      cbSuccess,
      cbError,
    );
  }

  function addTarget(targetPos) {
    console.log(`Add target ${targetPos}`);
    const player = getPlayerByPos(targetPos);
    if (!player) {
      MessageController.ShowError("Invalid target selected!");
    }
    const cbSuccess = () => {
      MessageController.ShowInfo(`Targeted ${player.Name}`);
    };
    const cbError = () => {
      MessageController.ShowError(`Error while targeting ${player.Name}`);
    };
    DataController.Act(playerView.Position, targetPos, cbSuccess, cbError);
  }

  function removeMafiaVote(target) {
    console.log(`Remove vote ${target}`);
    MafiaService.RemoveMafiaVote(playerView.Position, (resp) => {
      if (resp.status === 200) {
        MessageController.ShowInfo(`Removed vote: ${target}.`);
      }
    });
  }

  function removeTarget(target) {
    console.log(`Remove target ${target}`);
    MafiaService.RemoveAct(playerView.Position, (resp) => {
      if (resp.status === 200) {
        MessageController.ShowInfo(`Removed target: ${target}.`);
      }
    });
  }

  function getPlayerRow(player) {
    const position = player.Position;
    const emptyTd = <td />;

    var buttonVote = emptyTd;
    var buttonTarget = emptyTd;

    if(player.IsDead){
      buttonVote = (<td>
        {player.RoleName}
      </td>)

    } else {
      buttonVote = playerView.MafiaVotes.includes(position) ? (
        <MafiaGameButton
          text='Mafia vote'
          callback={() => removeMafiaVote(position)}
          customClass='mafia-button-wide'
        />
      ) : (
        <MafiaGameButton
          text='Mafia Vote'
          callback={() => addMafiaVote(position)}
          customClass='mafia-button-wide'
        />
      );

      buttonTarget = playerView.Targets.includes(position) ? (
        <MafiaGameButton
          text='use ability'
          callback={() => removeTarget(position)}
          customClass='mafia-button-narrow'
        />
      ) : (
        <MafiaGameButton
          text='Use ability'
          callback={() => addTarget(position)}
          customClass='mafia-button-narrow'
        />
      );
    }
    const playerClass = player.IsDead ? 'mafia-player-dead' : 'mafia-player';
    return (
      <tr key={position}>
        <td className={playerClass}>{player.Name}</td>
        {buttonVote}
        {buttonTarget}
      </tr>
    );
  }

  function getShuffledList() {
    var copy = arrangement.map((i) => playerView.PlayersState[i])
    let alive = copy.filter((e) => !e.IsDead)
    let dead = copy.filter((e) => e.IsDead)
    return alive.concat(dead)
  }

  function getPlayerRows() {
    let array = [];
    for (var player of getShuffledList()) {
      array.push(getPlayerRow(player));
    }
    return array;
  }

  return (
    <div>
      <div className='players-container'>
        <table className='table'>
          <thead></thead>
          <tbody>{getPlayerRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default GameNight;
