import Loader from "./controls/Loader";
import { useEffect, useState } from "react";
import DataController from "../controllers/DataController";
import CacheController from "../controllers/CacheController";
import useInterval from 'use-interval'
import config from "../config.json";

function LobbyUserList() {
  const [users, setUsers] = useState(null);
  const playerName = CacheController.GetPlayerName();

  const loadUsers = async () => {
    await DataController.GetLobbyPlayers((users) => setUsers(users));
  };
  useEffect(loadUsers, []);
  useInterval(loadUsers, config.PLAYER_LIST_REFRESH_MS);

  const mapUsers = () => {
    return users.map((u) => (
      <tr
        key={u.Id}
        className={playerName === u.Name ? "lobby-users-current-user" : ""}
      >
        <th scope='row'>{u.Position+1}</th>
        <td>{u.Name}</td>
      </tr>
    ));
  };

  return (
    <div className='lobby-users-container '>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
          </tr>
        </thead>
        {users != null && <tbody>{mapUsers()}</tbody>}
      </table>
      {users == null && <Loader></Loader>}
    </div>
  );
}

export default LobbyUserList;
