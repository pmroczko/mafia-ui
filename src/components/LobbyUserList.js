import Loader from "./Loader";
import { useEffect, useState } from "react";
import AppController from "../controllers/AppController";
import MafiaService from "../services/MafiaService";

function LobbyUserList() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetch() {
      const callback = (users) => {
        console.log(`${users.length} users are loaded: `);
        setUsers(users);
      };
      await AppController.GetLobbyPlayers(callback);
    }
    fetch();
  }, []);

  const mapUsers = () => {
    return users.map((u) => (
      <tr key={u.Id}>
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
