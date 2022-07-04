import Skull from '../components/Skull';
import ColorRoleInput from "../services/ScenarioValidator";

function actionStatus(playerView) {
  if (playerView.ActionsLeft === 0) {
    return [`You have no actions left.`];
  } else {
    if (playerView.Cooldown === 0 && playerView.ActionsLeft > 10) {
      return ["You can use your action."];
    } else {
      let res = [`You have ${playerView.ActionsLeft} actions left.`];
      if (playerView.Cooldown > 0) {
        if (playerView.Cooldown === 1) {
          return [res[0], `You have to wait for 1 night.`];
        } else {
          return [
            res[0],
            `You have to wait for ${playerView.Cooldown} nights.`,
          ];
        }
      }
      return res;
    }
  }
}

function GameStatus({
  playerView,
  arrangement,
}) {
  return (
    <div>
      {playerView.Messages.map((msg, idx) => (
        <div key={"message_row_" + idx}> {msg.text} </div>
      ))}
      {playerView.ExeTarget != null &&
        <div> You want to see {playerView.PlayersState[playerView.ExeTarget].Name} lynched.</div>
      }
      {actionStatus(playerView).map((line, idx) => (
        <div key={"action_status_row_" + idx}> {line} </div>
      ))}
      <table className='mafia-status-table'>
        <thead>
          <tr>
            <th>Player</th>
            <th>Role</th>
            <th>Status</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {arrangement.map((i) => playerView.PlayersState[i]).map((status) => (
            <tr key={"player_status_row_" + status.Position}>
              <td className={'name-cell' + (status.IsDead ? " mafia-player-dead" : "")}> {status.Name} {status.IsDead ? <Skull /> : ""} </td>
              <td className='role-cell'> {status.RoleName} </td>
              <td> {status.IsDead ? "Dead" : "Alive"} </td>
              <td> {status.VoteTarget} </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
          </tr>
        </thead>
        <tbody>
          {playerView.Scenario.map((role, idx) => (
            <tr key={"scenario_role_row_" + idx}>
              <td> {ColorRoleInput(role)} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GameStatus;
