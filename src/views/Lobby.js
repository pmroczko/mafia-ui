import Header from "../components/Header";
import LobbyUserList from "../components/LobbyUserList";
import AppController from "../controllers/AppController";
import { useEffect } from "react";

function Lobby() {
  return (
    <div id='lobby-container'>
      <Header text='Mafia Lobby' />
      <LobbyUserList />
    </div>
  );
}

export default Lobby;
