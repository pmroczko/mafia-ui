import Loader from "./controls/Loader";
import CacheController from "../controllers/CacheController";
import MafiaService from "../services/MafiaService";
import MessageController from "../controllers/MessageController";
import { Button } from "react-bootstrap";

function LobbyUserList({ isAdmin, serverId, users }) {
  const playerName = CacheController.GetPlayerName();

  const disconnect = (playerName) => {
    MafiaService.Disconnect(serverId, playerName, () => {
      MessageController.ShowInfo(`Disconnected ${playerName} player`);
    });
  };

  const mapUsers = () => {
    return users.map((u) => (
      <tr
        key={u.Id}
        className={playerName === u.Name ? "lobby-users-current-user" : ""}
      >
        <th scope='row'>{u.Position + 1}</th>
        <td>{u.Name}</td>
        {isAdmin && <td><Button onClick={() => disconnect(u.Name)} className='mafia-button'> disconnect </Button></td>}
      </tr>
    ));
  };

  return (
    <div className='lobby-users-container'>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            {isAdmin && <th scope='col'> </th>}
          </tr>
        </thead>
        {users != null && <tbody>{mapUsers()}</tbody>}
      </table>
      {users == null && <Loader></Loader>}
    </div>
  );
}

export default LobbyUserList;
