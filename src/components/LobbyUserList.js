import Loader from "./Loader";
import { useEffect, useState } from "react";
import DataController from "../controllers/DataController";
import CacheController from "../controllers/CacheController";
import useInterval from "../hooks/UseInterval";

function LobbyUserList() {
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
  useInterval(loadUsers, 1000);

  const mapUsers = () => {
    return users.map((u) => (
      <tr
        key={u.Id}
        className={playerName === u.Name ? "lobby-users-current-user" : ""}
      >
        <th scope='row'>{u.Position}</th>
        <td>{u.Name}</td>
        <td>{("" + u.Id).substr(0, 9) + "..."}</td>
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
            <th scope='col'>Id</th>
          </tr>
        </thead>
        {users != null && <tbody>{mapUsers()}</tbody>}
      </table>
      {users == null && <Loader></Loader>}
    </div>
  );
}

export default LobbyUserList;
