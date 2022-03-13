import Loader from "./controls/Loader";
import CacheController from "../controllers/CacheController";

function LobbyUserList({ users }) {
  const playerName = CacheController.GetPlayerName();

  const mapUsers = () => {
    return users.map((u) => (
      <tr
        key={u.Id}
        className={playerName === u.Name ? "lobby-users-current-user" : ""}
      >
        <th scope='row'>{u.Position + 1}</th>
        <td>{u.Name}</td>
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
          </tr>
        </thead>
        {users != null && <tbody>{mapUsers()}</tbody>}
      </table>
      {users == null && <Loader></Loader>}
    </div>
  );
}

export default LobbyUserList;
