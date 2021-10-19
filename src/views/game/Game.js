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
import RoleHelp from "../../components/RoleHelp";

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
    Position: 0,
  });
  const [messages, setMessages] = useState([]);
  const [publicState, setPublicState] = useState({
    IsDay: true,
    DayNumber: 0,
    Scenario: [],
    Players: [],
    Winners: [],
  });
  const [playersPublicStatus, setPlayersPublicStatus] = useState([])
  const [playersArrangement, setPlayersArrangement] = useState([])

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const toggleGameShown = () => {
    setIsGameShown(!isGameShown);
  };

  useInterval(async () => {
    DataController.GetPlayerState(position, (newPlayerState) => {
      if (JSON.stringify(newPlayerState) !== JSON.stringify(playerState)) {
        setPlayerState(newPlayerState);
      }
    });
    MafiaService.GetPlayerMessages(position, (resp) => {
      if (resp.status === 200) {
        if (JSON.stringify(messages) !== JSON.stringify(resp.data)) {
          setMessages(resp.data);
        }
      }
    });
    DataController.GetPublicState((newPublicState) => {
      if (JSON.stringify(newPublicState) !== JSON.stringify(publicState)) {
        setPublicState(newPublicState);
      }
      if (newPublicState.Players.length > 0 && playersArrangement.length == 0) {
        var arrangement = [...Array(newPublicState.Players.length).keys()];
        setPlayersArrangement(shuffleArray(arrangement));
      }
    });
    DataController.GetPlayersPublicStatus(position, (newPlayersPublicStatus) => {
      if (JSON.stringify(playersPublicStatus) !== JSON.stringify(newPlayersPublicStatus)) {
        setPlayersPublicStatus(newPlayersPublicStatus)
      }
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
    DataController.ShowModalInfo(<RoleHelp roleName={playerState.RoleName} />);
  }

  function gameStatus() {
    DataController.ShowModalInfo(<GameStatus
      messages={messages}
      playerState={playerState}
      publicState={publicState}
      playersPublicStatus={playersPublicStatus}
      arrangement={playersArrangement}
    />)
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
            <GameNight publicState={publicState} playerState={playerState} arrangement={playersArrangement} />
          )}
          {!isGameOver() && (<Footer buttons={buttons} />)}
        </div>
      )}

    </div>
  );
}

export default Game;
