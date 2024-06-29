import MafiaService from "../../services/MafiaService";
import MessageController from "../../controllers/MessageController";
import MafiaGameButton from "../../components/buttons/MafiaGameButton";
import Skull from '../../components/Skull';

const GameNight = ({ playerView, setPlayerView, arrangement, serverId }) => {

  const getPlayerByPos = (pos) => {
    return playerView.PlayersState[pos];
  };

  function addTarget(target) {
    console.log(`Add target ${target}`);
    const player = getPlayerByPos(target);
    if (!player) {
      MessageController.ShowError("Invalid target selected!");
    }
    const cbSuccess = () => {
      let newTargets = [target];
      if (playerView.RoleName === "BusDriver" && playerView.Targets.length > 0) {
        newTargets.push(playerView.Targets[0])
      }
      setPlayerView({
        ...playerView,
        Targets: newTargets
      })
    };
    MafiaService.Act(serverId, playerView.Position, target, cbSuccess);
  }

  function removeTarget(target) {
    console.log(`Remove target ${target}`);
    const player = getPlayerByPos(target);
    if (!player) {
      MessageController.ShowError("Invalid target selected!");
    }
    const cbSuccess = () => {
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

    var buttonTarget = emptyTd;

    if (player.IsDead) {
      buttonTarget = (<td className="mafia-role-dead">
        {player.RoleName}
      </td>)

    } else {

      buttonTarget = playerView.Targets.includes(position) ? (
        <MafiaGameButton
          text='use Ability'
          callback={() => removeTarget(position)}
          customClass='mafia-button-wide'
          isDisabled={!player.IsTargetable}
        />
      ) : (
        <MafiaGameButton
          text='Use Ability'
          callback={() => addTarget(position)}
          customClass='mafia-button-wide'
          isDisabled={!player.IsTargetable}
        />
      );
    }
    const playerClass = player.IsDead ? 'mafia-player-dead' : 'mafia-player';
    const icon = player.IsDead ? (<Skull />) : "";
    return (
      <tr key={"action_row_" + position}>
        <td className={playerClass}>{player.Name}{icon}</td>
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
