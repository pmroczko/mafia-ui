import Header from "../../components/Header";
import { useState, useEffect } from "react";
import useInterval from 'use-interval'
import CacheController from "../../controllers/CacheController";
import DataController from "../../controllers/DataController";
import config from "../../config.json";
import Loader from "../../components/Loader";
import MafiaGameButton from "../../components/buttons/MafiaGameButton";
import MessageController from "../../controllers/MessageController";
import MafiaButton from "../../components/buttons/MafiaButton";
import MafiaService from "../../services/MafiaService";

const AdminUserList = ({ onMenuSelected }) => {
  const [users, setUsers] = useState([]);
  const [isListShown, setIsListShown] = useState(true);
  const playerName = CacheController.GetPlayerName();

  const loadUsers = async () => {
    await DataController.GetLobbyPlayers((users) => setUsers(users));
  };
  useEffect(loadUsers, []);
  useInterval(loadUsers, config.PLAYER_LIST_REFRESH_MS);
  const disconnect = (player) => {
    MafiaService.Disconnect(player.Name, (resp) => {
      if (resp.status === 200) {
        MessageController.ShowInfo(`Disconnected ${player.Name} player`);
      } else {
        MessageController.ShowError(
          `Could not disconnect ${player.Name}`,
          resp,
        );
      }
    });
  };

  const mapUsers = () => {
    return users.map((u) => (
      <tr
        key={u.Id}
        className={playerName === u.Name ? "lobby-users-current-user" : ""}
      >
        <th scope='row'>{u.Position}</th>
        <td>{u.Name}</td>
        <td>{u.ShortId}</td>
        <MafiaGameButton text='Disconnect' callback={() => disconnect(u)} />
      </tr>
    ));
  };

  const toggleListShown = () => {
    setIsListShown(!isListShown);
  };

  const lobbyUsers = (
    <div className='lobby-users-container '>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Id</th>
            <th scope='col'>Disconnect</th>
          </tr>
        </thead>
        {users != null && <tbody>{mapUsers()}</tbody>}
      </table>
      {users == null && <Loader></Loader>}
    </div>
  );

  return (
    <div>
      <Header
        text='Manage Players'
        onMenuShown={toggleListShown}
        onMenuHidden={toggleListShown}
      />
      {isListShown && lobbyUsers}
    </div>
  );
};

export default AdminUserList;
