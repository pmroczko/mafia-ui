import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import useInterval from "../../hooks/UseInterval";
import MafiaService from "../../services/MafiaService";
import Header from "../../components/Header";
import GameStatus from "../../components/GameStatus";
import DataController from "../../controllers/DataController";
import MessageController from "../../controllers/MessageController";
import CacheController from "../../controllers/CacheController";
import InfoLabel from "../../components/InfoLabel";
import GameNight from "./GameNight";
import GameDay from "./GameDay";
import GameOver from "./GameOver";
import GameOverPlayerStatus from "../../enums/GameOverPlayerStatus";
import Footer from "../../components/Footer";

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
  const [playersPublicStatus, setPlayersPublicStatus] = useState([])

  const toggleGameShown = () => {
    setIsGameShown(!isGameShown);
  };

  useInterval(async () => {
    DataController.GetPlayerState(position, (playerState) => {
      setPlayerState(playerState);
    });
    MafiaService.GetPlayerMessages(position, (resp) => {
      if (resp.status === 200) {
        setMessages(resp.data);
      }
    });
    DataController.GetPublicState((publicState) => {
      setPublicState(publicState);
    });
    DataController.GetPlayersPublicStatus(position, (playersPublicState) => {
      setPlayersPublicStatus(playersPublicState)
    });
  }, 1000);

  const isGameOver = () => {
    return publicState.Winners.length > 0 || playerState.IsDead;
  };

  const gameOverStatus = () => {
    if (isGameOver()) {
      return publicState.Winners.includes(parseInt(playerState.Position))
        ? GameOverPlayerStatus.Winner
        : GameOverPlayerStatus.Looser;
    }
    return GameOverPlayerStatus.Dead;
  };

  function showRole() {
    DataController.ShowModalInfo(playerState.Description.map((line, _) =>
      <div> {line} </div>
    ));
  }

  function gameStatus() {
    DataController.ShowModalInfo(<GameStatus messages={messages} playerState={playerState} playersPublicStatus={playersPublicStatus} />)
  }

  const buttons = [
    {
      text: "Role",
      callback: () => showRole(),
    },
    {
      text: "Game Status",
      callback: () => gameStatus(),
    },
  ];

  return (
    <div>
      <Header
        text={`Mafia`}
        subText={process.env.REACT_APP_VER}
        onMenuShown={toggleGameShown}
        onMenuHidden={toggleGameShown}
      />
      <InfoLabel isDay={publicState.IsDay} dayNumber={publicState.DayNumber} />
      {isGameShown && publicState != null && playerState != null && (
        <div>
          {isGameOver() ? (
            <GameOver gameOverStatus={gameOverStatus()} />
          ) : publicState.IsDay ? (
            <GameDay publicState={publicState} playerState={playerState} />
          ) : (
            <GameNight publicState={publicState} playerState={playerState} />
          )}
          {!isGameOver() && (<Footer buttons={buttons} />)}
        </div>
      )}

    </div>
  );
}

export default Game;
