import Header from "../components/Header";
import LobbyUserList from "../components/LobbyUserList";
import AppController from "../controllers/AppController";

function Lobby() {
  const lobbyUsers = AppController.GetLobbyUsers();
  return (
    <div id='lobby-container'>
      <Header text='Mafia Lobby' />
      <LobbyUserList Users={lobbyUsers} />
    </div>
  );
}

export default Lobby;
