import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import AppController from "../controllers/AppController";

function LobbyUserList() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetch() {
      const resp = await AppController.GetLobbyUsers();
      console.log("Users are loaded: " + resp.length);
      setUsers(resp);
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
        <thead className='table-dark'>
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
