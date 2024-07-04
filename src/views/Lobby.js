import Header from "../components/Header";
import LobbyUserList from "../components/LobbyUserList";
import { useState, useEffect, useRef } from "react";
import MafiaService from "../services/MafiaService";
import CacheController from "../controllers/CacheController";
import Footer from "../components/Footer";
import DataController from "../controllers/DataController";
import ScenarioEditor from "./admin/ScenarioEditor";

function Lobby() {
  const [isListShown, setIsListShown] = useState(true);
  const [playerName, setPlayerName] = useState(CacheController.GetPlayerName());
  const [isPlayer, setIsPlayer] = useState(CacheController.IsPlayerNameSet());
  const [serverId, setServerId] = useState(CacheController.GetServerId());
  const [lobbyView, setLobbyView] = useState(
    {
      HostName: "",
      Players: []
    }
  );

  const connection = useRef(null)

  useEffect(() => {
    if (serverId) {
      poolLobby();

      if (connection.current == null) {
        const ws = new WebSocket(`${process.env.REACT_APP_SERVER_URL}/lobby_ws/${serverId}`)

        // Connection opened
        ws.addEventListener("open", (event) => {
          console.debug("Connection open")
        })

        // Listen for messages
        ws.addEventListener("message", (event) => {
          console.debug("Message from server ", event.data)
          poolLobby();
        })

        connection.current = ws

        return () => connection.current.close()
      }
    }
  }, [serverId])

  const poolLobby = async () => {
    await DataController.GetLobbyView(serverId,
      (lobbyView) => {
        if (lobbyView.Players.filter((p) => p.Name == playerName).length == 0) { // if player got disconnected
          window.location = "/join"
        } else {
          setLobbyView(lobbyView); // if game is still in the lobby state
        }
      },
      () => { window.location = "/game" } // if game has started, move to game view
    );
  };

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
