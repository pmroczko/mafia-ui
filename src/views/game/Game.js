import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import useInterval from "../../hooks/UseInterval";
import MafiaService from "../../services/MafiaService";
import Header from "../../components/Header";
import DataController from "../../controllers/DataController";
import MessageController from "../../controllers/MessageController";
import CacheController from "../../controllers/CacheController";
import InfoLabel from "../../components/InfoLabel";
import GameNight from "./GameNight";
import GameDay from "./GameDay";

function Game() {
  const position = CacheController.GetPlayerPosition();
  const [isGameShown, setIsGameShown] = useState(true);
  const [playerState, setPlayerState] = useState({
    RoleName: "None",
    Targets: [],
    MafiaVotes: [],
    IsDead: false,
    Cooldown: 0,
    ActionsLeft: 100,
    Description: [],
  });
  const [messages, setMessages] = useState([]);
  const [publicState, setPublicState] = useState({
    IsDay: true,
    DayNumber: 0,
    Players: [],
    Winners: [],
  });

  const toggleGameShown = () => {
    setIsGameShown(!isGameShown);
  };

  useInterval(async () => {
    DataController.GetPlayerState(position, (playerState) => {
      setPlayerState(playerState);
    });
    MafiaService.GetPlayerMessages(position, (resp) => {
      if (resp.status === 200) {
        if (JSON.stringify(resp.data) === JSON.stringify(messages)) {
          return;
        }
        setMessages(resp.data);
        for (const msg of messages) {
          MessageController.ShowInfo(msg.text);
        }
      }
    });
    DataController.GetPublicState((publicState) => {
      setPublicState(publicState);
    });
  }, 1000);

  return (
    <div>
      <Header
        text={`Mafia ${process.env.REACT_APP_VER}`}
        onMenuShown={toggleGameShown}
        onMenuHidden={toggleGameShown}
      />
      <InfoLabel isDay={publicState.IsDay} dayNumber={publicState.DayNumber} />
      {isGameShown && publicState != null && playerState != null && (
        <div>
          {(publicState.Winners.length > 0 &&
            (publicState.Winners.includes(parseInt(position)) ? (
              <div> YOU WIN! </div>
            ) : (
              <div> YOU LOOSE! </div>
            ))) || (
            <div>
              {!playerState.IsDead && publicState.IsDay && (
                <GameDay publicState={publicState} playerState={playerState} />
              )}
              {!playerState.IsDead && !publicState.IsDay && (
                <GameNight
                  publicState={publicState}
                  playerState={playerState}
                />
              )}
              {playerState.IsDead && <div> YOU ARE DEAD! </div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
