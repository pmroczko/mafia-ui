import Header from "../components/Header";
import LobbyUserList from "../components/LobbyUserList";
import { useState, useEffect } from "react";
import MafiaService from "../services/MafiaService";
import MafiaButton from "../components/buttons/MafiaButton";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import useInterval from "../hooks/UseInterval";
import CacheController from "../controllers/CacheController";

const ConnectionStatus = {
  Connected: "Connected",
  NotConnected: "NotConnected",
};

function Lobby() {
  let history = useHistory();
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

  return (
    <div className='main-container lobby-container '>
      <Header
        text={headerText}
        onMenuShown={toggleListShown}
        onMenuHidden={toggleListShown}
      />
      {isPlayer && (
        <div className='mafia-button-footer'>
          <MafiaButton
            label='Disconnect'
            func='Disconnect'
            args={[playerName, disconnectCallback]}
          />
        </div>
      )}
      {isListShown && <LobbyUserList />}
    </div>
  );
}

export default Lobby;
