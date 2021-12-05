import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
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
import useInterval from 'use-interval'

function Game() {
  const playerName = CacheController.GetPlayerName();
  const [isGameShown, setIsGameShown] = useState(true);
  const [playerView, setPlayerView] = useState({
    IsDay: true,
    DayNumber: 0,
    Winners: [],
    Scenario: [],
    SecondsLeft: 0,
    Name: "None",
    RoleName: "None",
    Messages: [],
    PlayersState: [],
    IsDead: false,
    Cooldown: 0,
    ActionsLeft: 100,
    ExeTarget: null,
    Targets: [],
    MafiaVotes: [],
  })
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

  function computeArrangement(playerView) {
    var arrangement = shuffleArray([...Array(playerView.PlayersState.length).keys()]);
    let alive = arrangement.filter((i) => !playerView.PlayersState[i].IsDead)
    let dead = arrangement.filter((i) => playerView.PlayersState[i].IsDead)
    return alive.concat(dead)

  }

  function poolPlayerView() {
    DataController.GetPlayerView(playerName, (newPlayerView) => {
      setPlayerView(newPlayerView);
      if (newPlayerView.PlayersState.length > 0 && playersArrangement.length == 0) {
        setPlayersArrangement(computeArrangement(newPlayerView))
      }
    });
  }

  useInterval(poolPlayerView, 1000, true);

  const isGameOver = () => {
    return playerView.Winners.length > 0 || playerView.IsDead;
  };

  const gameOverStatus = () => {
    if (playerView.Winners.length > 0) {
      return playerView.Winners.includes(parseInt(playerView.Position))
        ? GameOverPlayerStatus.Winner
        : GameOverPlayerStatus.Looser;
    }
    return GameOverPlayerStatus.Dead;
  };

  function showRole() {
    DataController.ShowModalInfo(<RoleHelp roleName={playerView.RoleName} />);
  }

  function gameStatus() {
    DataController.ShowModalInfo(<GameStatus
      playerView={playerView}
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
        text={CacheController.GetPlayerName()}
        subText={process.env.REACT_APP_VER}
        onMenuShown={toggleGameShown}
        onMenuHidden={toggleGameShown}
      />
      <InfoLabel isDay={playerView.IsDay} dayNumber={playerView.DayNumber} aliveCnt={playerView.PlayersState.filter(p => !p.IsDead).length} secondsLeft={playerView.SecondsLeft} />
      {isGameShown && playerView != null && (
        <div>
          {isGameOver() ? (
            <GameOver gameOverStatus={gameOverStatus()} />
          ) : playerView.IsDay ? (
            <GameDay playerView={playerView} />
          ) : (
            <GameNight playerView={playerView} arrangement={playersArrangement} />
          )}
          {!isGameOver() && (<Footer buttons={buttons} />)}
        </div>
      )}

    </div>
  );
}

export default Game;
