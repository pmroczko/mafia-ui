import Header from "../components/Header";
import LobbyUserList from "../components/LobbyUserList";
import { useState, useEffect } from "react";
import MafiaService from "../services/MafiaService";
import CacheController from "../controllers/CacheController";
import Footer from "../components/Footer";
import DataController from "../controllers/DataController";
import ScenarioEditor from "./admin/ScenarioEditor";
import useInterval from 'use-interval'

function Lobby() {
  const [isListShown, setIsListShown] = useState(true);
  const [playerName, setPlayerName] = useState(null);
  const [isPlayer, setIsPlayer] = useState(false);
  const [serverId, setServerId] = useState(null);
  const [lobbyView, setLobbyView] = useState(
    {
      HostName: "",
      Players: []
    }
  );

  const poolLobby = async () => {
    await DataController.GetLobbyView(serverId,
      (lobbyView) => setLobbyView(lobbyView), // if game is still in the lobby state
      () => { window.location = "/game" } // if game has started, move to game view
    );
  };

  function initialize() {
    setPlayerName(CacheController.GetPlayerName());
    setServerId(CacheController.GetServerId());
    setIsPlayer(CacheController.IsPlayerNameSet());
  }

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (serverId != null) {
      poolLobby();
    }
  }, [serverId])

  useInterval(() => {
    poolLobby()
  }, 1000)


  const toggleListShown = () => {
    setIsListShown(!isListShown);
  };

  function disconnectCallback(data) {
    setPlayerName(null);
    setIsPlayer(false);
    CacheController.ClearPlayerName();
  }

  const buttons = [
    {
      text: "Disconnect",
      admin: false,
      callback: () => {
        MafiaService.Disconnect(serverId, playerName, disconnectCallback);
        window.location = "/join"
      },
    },
    {
      text: "Start game",
      admin: true,
      callback: () => {
        DataController.ShowModalInfo(<ScenarioEditor canStartGame={true} isModal={true} />)
      }
    }
  ];

  return (
    <div className='main-container lobby-container '>
      <Header
        text={serverId ? `${serverId}` : ""}
        onMenuShown={toggleListShown}
        onMenuHidden={toggleListShown}
      />
      {isPlayer && <Footer isAdmin={playerName === lobbyView.HostName} buttons={buttons} />}
      {isListShown && <LobbyUserList isAdmin={playerName === lobbyView.HostName} serverId={serverId} users={lobbyView.Players} />}
    </div>
  );
}

export default Lobby;
