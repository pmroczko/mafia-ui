import MafiaService from "../../services/MafiaService";
import MessageController from "../../controllers/MessageController";
import MafiaGameButton from "../../components/buttons/MafiaGameButton";
import Skull from '../../components/Skull';

const GameNight = ({ playerView, setPlayerView, arrangement, serverId }) => {

  const getPlayerByPos = (pos) => {
    return playerView.PlayersState[pos];
  };

  function addMafiaVote(target) {
    console.log(`Add vote ${target}`);
    const player = getPlayerByPos(target);
    if (!player) {
      MessageController.ShowError("Invalid vote target selected!");
    }
    const cbSuccess = () => {
      MessageController.ShowInfo(`You voted for ${player.Name}`);
      setPlayerView({
        ...playerView,
        MafiaVotes: [...playerView.MafiaVotes, target]
      })
    };
    MafiaService.AddMafiaVote(
      serverId,
      playerView.Position,
      target,
      cbSuccess,
    );
  }

  function addTarget(target) {
    console.log(`Add target ${target}`);
    const player = getPlayerByPos(target);
    if (!player) {
      MessageController.ShowError("Invalid target selected!");
    }
    const cbSuccess = () => {
      MessageController.ShowInfo(`Targeted ${player.Name}`);
      let newTargets = [target];
      if (playerView.RoleName == "BusDriver" && playerView.Targets.length > 0) {
        newTargets.push(playerView.Targets[0])
      }
      let x = 1;
      setPlayerView({
        ...playerView,
        Targets: newTargets
      })
    };
    MafiaService.Act(serverId, playerView.Position, target, cbSuccess);
  }

  function removeMafiaVote(target) {
    console.log(`Remove vote ${target}`);
    const player = getPlayerByPos(target);
    if (!player) {
      MessageController.ShowError("Invalid target selected!");
    }
    const cbSuccess = () => {
      MessageController.ShowInfo(`Removed vote: ${player.Name}.`);
      setPlayerView({
        ...playerView,
        MafiaVotes: []
      })
    };
    MafiaService.RemoveMafiaVote(serverId, playerView.Position, cbSuccess);
  }

  function removeTarget(target) {
    console.log(`Remove target ${target}`);
    const player = getPlayerByPos(target);
    if (!player) {
      MessageController.ShowError("Invalid target selected!");
    }
    const cbSuccess = () => {
      MessageController.ShowInfo(`Removed target: ${player.Name}.`);
      setPlayerView({
        ...playerView,
        Targets: playerView.Targets.filter(e => e !== target)
      })
    };
    MafiaService.RemoveAct(serverId, playerView.Position, target, cbSuccess);
  }

  function getPlayerRow(player) {
    const position = player.Position;
    const emptyTd = <td />;

    var buttonVote = emptyTd;
    var buttonTarget = emptyTd;

    if (player.IsDead) {
      buttonVote = (<td className="mafia-role-dead">
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
          text='use Ability'
          callback={() => removeTarget(position)}
          customClass='mafia-button-narrow'
        />
      ) : (
        <MafiaGameButton
          text='Use Ability'
          callback={() => addTarget(position)}
          customClass='mafia-button-narrow'
        />
      );
    }
    const playerClass = player.IsDead ? 'mafia-player-dead' : 'mafia-player';
    const icon = player.IsDead ? (<Skull />) : "";
    return (
      <tr key={"action_row_" + position}>
        <td className={playerClass}>{player.Name}{icon}</td>
        {buttonVote}
        {buttonTarget}
      </tr>
    );
  }

  function getShuffledList() {
    return arrangement.map((i) => playerView.PlayersState[i])
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
