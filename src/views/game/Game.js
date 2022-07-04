import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";
import GameStatus from "../../components/GameStatus";
import DataController from "../../controllers/DataController";
import CacheController from "../../controllers/CacheController";
import InfoLabel from "../../components/InfoLabel";
import GameNight from "./GameNight";
import GameDay from "./GameDay";
import GameOver from "./GameOver";
import GameOverPlayerStatus from "../../enums/GameOverPlayerStatus";
import Footer from "../../components/Footer";
import RoleHelp from "../../components/helpers/RoleHelp";
import useInterval from 'use-interval'
import EventController from "../../controllers/EventController"
import AdminMenu from "../admin/AdminMenu";

function Game() {
  const playerName = CacheController.GetPlayerName();
  const serverId = CacheController.GetServerId();
  const [isGameShown, setIsGameShown] = useState(true);
  const [playerView, setPlayerView] = useState({
    HostName: "None",
    IsDay: true,
    DayNumber: 0,
    Winners: [],
    Scenario: [],
    ServerClockOffset: 0,
    TargetTime: "1970-01-01T00:00:00+00:00",
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
  });
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [arrangement, setArrangement] = useState([])


  function subscribe() {
    EventController.ConnectToGame(serverId);
    EventController.Subscribe(e => {
      console.log("Received event: ", e.data);
      poolPlayerView(arrangement);
    });
  }

  useEffect(() => {
    if (serverId) {
      subscribe();
      poolPlayerView(arrangement);
    }
  }, []);

  useInterval(() => {
    let target_timestamp = Date.parse(playerView.TargetTime)
    let current_timestamp = Date.now() + playerView.ServerClockOffset;
    setSecondsLeft(Math.max(Math.floor((target_timestamp - current_timestamp) / 1000), 0));
  }, 1000)

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

  function poolPlayerView(arrangement) {
    DataController.GetPlayerView(serverId, playerName, (newPlayerView) => {
      setPlayerView(newPlayerView);
      if (newPlayerView.PlayersState.length > 0 && arrangement.length === 0) {
        setArrangement(computeArrangement(newPlayerView));
      }
    });
  }


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
    DataController.ShowModalInfo(<RoleHelp roleName={playerView.RoleName} roleRules={playerView.RoleRules} />);
  }

  function gameStatus() {
    DataController.ShowModalInfo(<GameStatus
      playerView={playerView}
      arrangement={arrangement}
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
    {
      text: "Admin",
      admin: true,
      callback: () => {
        DataController.ShowModalInfo(<AdminMenu canStartGame={false} />)
      }
    }
  ];

  return (
    <div>
      <Header
        text={CacheController.GetPlayerName()}
        subText={process.env.REACT_APP_VER}
        onMenuShown={toggleGameShown}
        onMenuHidden={toggleGameShown}
      />
      <InfoLabel isDay={playerView.IsDay} dayNumber={playerView.DayNumber} aliveCnt={playerView.PlayersState.filter(p => !p.IsDead).length} secondsLeft={secondsLeft} />
      {isGameShown && playerView != null && (
        <div>
          {isGameOver() ? (
            <GameOver statusId={serverId} gameOverStatus={gameOverStatus()} isAdmin={playerName === playerView.HostName} />
          ) : playerView.IsDay ? (
            <GameDay playerView={playerView} serverId={serverId} />
          ) : (
            <GameNight playerView={playerView} setPlayerView={setPlayerView} arrangement={arrangement} serverId={serverId} />
          )}
          {!isGameOver() && (<Footer isAdmin={playerName === playerView.HostName} buttons={buttons} />)}
        </div>
      )}
    </div>
  );
}

export default Game;
