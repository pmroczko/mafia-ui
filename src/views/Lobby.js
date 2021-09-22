import Header from "../components/Header";
import LobbyUserList from "../components/LobbyUserList";
import Menu from "../components/Menu";

function Lobby() {
  return (
    <div className='main-container lobby-container '>
      <Header text='Mafia Lobby' />
      <LobbyUserList />
    </div>
  );
}

export default Lobby;
