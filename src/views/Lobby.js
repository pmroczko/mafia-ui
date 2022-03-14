import Header from "../components/Header";
import LobbyUserList from "../components/LobbyUserList";
import { useState, useEffect } from "react";
import MafiaService from "../services/MafiaService";
import CacheController from "../controllers/CacheController";
import Footer from "../components/Footer";
import DataController from "../controllers/DataController";
import EventController from "../controllers/EventController"

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

  const loadUsers = async () => {
    console.log("Loading users.");
    await DataController.GetLobbyView(serverId, (lobbyView) => setLobbyView(lobbyView));
  };

  function initialize() {
    setPlayerName(CacheController.GetPlayerName());
    setServerId(CacheController.GetServerId());
    setIsPlayer(CacheController.IsPlayerNameSet());
  }

  function subscribe() {
    EventController.ConnectTo(serverId);
    EventController.Subscribe(e => {
      console.log("Received event: ", e.data);
      loadUsers();
      if (isPlayer) {
        MafiaService.PlayerView(serverId, playerName, async (data) => {
          window.location = `/game`;
        });
      }
    });
  }

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (serverId) {
      subscribe();
      loadUsers();
    }
  }, [serverId]);


  const headerText = isPlayer ? `Hello ${playerName}` : "Lobby (? player)";

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
      callback: () => {
        MafiaService.Disconnect(serverId, playerName, disconnectCallback);
        window.location = "/join"
      },
    },
  ];

  return (
    <div className='main-container lobby-container '>
      <Header
        text={headerText}
        onMenuShown={toggleListShown}
        onMenuHidden={toggleListShown}
      />
      {isPlayer && <Footer buttons={buttons} />}
      {isListShown && <LobbyUserList users={lobbyView.Players} />}
    </div>
  );
}

export default Lobby;
