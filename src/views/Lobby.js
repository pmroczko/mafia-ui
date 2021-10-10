import Header from "../components/Header";
import LobbyUserList from "../components/LobbyUserList";
import { useState, useEffect } from "react";
import MafiaService from "../services/MafiaService";
import MafiaButton from "../components/buttons/MafiaButton";
import useInterval from "../hooks/UseInterval";
import CacheController from "../controllers/CacheController";
import ButtonClasses from "../enums/ButtonClasses";
import Footer from "../components/Footer";

function Lobby() {
  const [isListShown, setIsListShown] = useState(true);
  const [playerName, setPlayerName] = useState(null);
  const [isPlayer, setIsPlayer] = useState(false);

  useEffect(() => {
    setPlayerName(CacheController.GetPlayerName());
    setIsPlayer(CacheController.IsPlayerNameSet());
  }, []);

  const headerText = isPlayer ? `Hello ${playerName}` : "Lobby (? player)";

  useInterval(async () => {
    if (isPlayer) {
      MafiaService.GetPlayerPosition(playerName, async (resp) => {
        if (resp.status === 200) {
          CacheController.SetPlayerPosition(resp.data);
          window.location = "/game";
          //history.push(`/player?position=${JSON.parse(resp.data)}`);
        }
      });
    }
  }, 1000);

  const toggleListShown = () => {
    setIsListShown(!isListShown);
  };

  function disconnectCallback(resp) {
    if (resp.status === 200) {
      setPlayerName(null);
      setIsPlayer(false);
      CacheController.ClearPlayerName();
    }
  }

  const buttons = [
    {
      text: "Disconnect",
      callback: () => MafiaService.Disconnect(playerName, disconnectCallback),
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
      {isListShown && <LobbyUserList />}
    </div>
  );
}

export default Lobby;
