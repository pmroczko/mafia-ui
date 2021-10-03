import { Button } from "react-bootstrap";
import MafiaButton from "../../components/buttons/MafiaButton";
import Header from "../../components/Header";
import ButtonClasses from "../../enums/ButtonClasses";
import { useState, useEffect, useInterval } from "react";
import CacheController from "../../controllers/CacheController";
import DataController from "../../controllers/DataController";
import config from "../../config.json";
import Loader from "../../components/Loader";

const AdminUserList = ({ onMenuSelected }) => {
  const [users, setUsers] = useState(null);
  const playerName = CacheController.GetPlayerName();

  const loadUsers = async () => {
    const callback = (users) => {
      console.log(`${users.length} users are loaded`);
      setUsers(users);
    };
    await DataController.GetLobbyPlayers(callback);
  };
  useEffect(loadUsers, []);
  useInterval(loadUsers, config.PLAYER_LIST_REFRESH_MS);

  const mapUsers = () => {
    return users.map((u) => (
      <tr
        key={u.Id}
        className={playerName === u.Name ? "lobby-users-current-user" : ""}
      >
        <th scope='row'>{u.Position}</th>
        <td>{u.Name}</td>
        <td>{u.ShortId}</td>
      </tr>
    ));
  };

  return (
    <div>
      <Header text='Manage Players' />
      <div className='lobby-users-container '>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Id</th>
            </tr>
          </thead>
          {users != null && <tbody>{mapUsers()}</tbody>}
        </table>
        {users == null && <Loader></Loader>}
      </div>
    </div>
  );
};

export default AdminUserList;
