import Header from "../../components/Header";
import { useState, useEffect } from "react";
import useInterval from 'use-interval'
import CacheController from "../../controllers/CacheController";
import DataController from "../../controllers/DataController";
import config from "../../config.json";
import Loader from "../../components/controls/Loader";
import MafiaGameButton from "../../components/buttons/MafiaGameButton";
import MessageController from "../../controllers/MessageController";
import MafiaService from "../../services/MafiaService";
import EventController from "../../controllers/EventController"

const AdminUserList = ({ onMenuSelected }) => {
  const playerName = CacheController.GetPlayerName();
  const serverId = CacheController.GetServerId();
  const [users, setUsers] = useState([]);
  const [isListShown, setIsListShown] = useState(true);

  const loadUsers = async () => {
    await DataController.GetLobbyView(serverId, (lobby_view) => setUsers(lobby_view.Players));
  };
  function subscribe() {
    EventController.ConnectTo(serverId);
    EventController.Subscribe(e => {
      console.log("Received event: ", e.data);
      loadUsers();
    });
  }

  useEffect(() => {
    if (serverId) {
      subscribe();
      loadUsers();
    }
  }, []);

  const disconnect = (player) => {
    MafiaService.Disconnect(serverId, player.Name, () => {
      MessageController.ShowInfo(`Disconnected ${player.Name} player`);
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
