import { useState, useRef, useEffect } from "react";
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
import AdminMenu from "../admin/AdminMenu";

function Game() {
  const playerName = CacheController.GetPlayerName();
  const serverId = CacheController.GetServerId();
  const [isGameShown, setIsGameShown] = useState(true);
  const [playerView, setPlayerView] = useState({
    HostName: "None",
    Winners: [],
    Scenario: [],
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
  const [isDay, setIsDay] = useState(true)
  const [gameTime, setGameTime] = useState({
    IsDay: true,
    DayNumber: 0,
    TimeLeft: 0,
  })
  const arrangementRef = useRef([])

  const connection = useRef(null)

  useEffect(() => {
    console.log("pooling view")
    poolPlayerView()
  }, [isDay])

  function start_websocket() {
    const ws = new WebSocket(`${process.env.REACT_APP_SERVER_URL}/game_time/${serverId}`)

    // Connection opened
    ws.addEventListener("open", (event) => {
      console.debug("Connection open")
    })

    // Listen for messages
    ws.addEventListener("message", (event) => {
      let game_time = DataController.ParseGameTime(event.data);
      setGameTime(game_time);
      setIsDay(game_time.IsDay);
    })

    return ws
  }

  useEffect(() => {
    if (connection.current == null) {
      connection.current = start_websocket()
      return () => connection.current.close()
    }
  }, [])

  useInterval(() => {
    if (connection.current && connection.current.readyState != WebSocket.OPEN) {
      connection.current.close();
      connection.current = start_websocket();
    }
  },
    1000)

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
    DataController.GetPlayerView(serverId, playerName, (newPlayerView) => {
      setPlayerView(newPlayerView);
      if (newPlayerView.PlayersState.length > 0 && arrangementRef.current.length === 0) {
        arrangementRef.current = computeArrangement(newPlayerView);
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
      arrangement={arrangementRef.current}
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
      <InfoLabel isDay={gameTime.IsDay} dayNumber={gameTime.DayNumber} aliveCnt={playerView.PlayersState.filter(p => !p.IsDead).length} secondsLeft={gameTime.TimeLeft + 1} />
      {isGameShown && playerView != null && (
        <div>
          {isGameOver() ? (
            <GameOver statusId={serverId} gameOverStatus={gameOverStatus()} isAdmin={playerName === playerView.HostName} />
          ) : gameTime.IsDay ? (
            <GameDay playerView={playerView} serverId={serverId} />
          ) : (
            <GameNight playerView={playerView} setPlayerView={setPlayerView} arrangement={arrangementRef.current} serverId={serverId} />
          )}
          {!isGameOver() && (<Footer isAdmin={playerName === playerView.HostName} buttons={buttons} />)}
        </div>
      )}
    </div>
  );
}

export default Game;
