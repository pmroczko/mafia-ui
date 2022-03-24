import GameOverPlayerStatus from "../../enums/GameOverPlayerStatus";
import skull from "../../graphics/skull.png";
import winner1 from "../../graphics/winner1.png";
import DataController from "../../controllers/DataController";
import SimpleRolesList from "../../components/helpers/SimpleRolesList";
import Footer from "../../components/Footer";
import Admin from "../admin/Admin";

const GameOver = ({ statusId, gameOverStatus, isAdmin }) => {
  var gameOver = "";
  var icon = false;

  switch (gameOverStatus) {
    case GameOverPlayerStatus.Winner:
      gameOver = "You won!";
      icon = winner1;
      break;
    case GameOverPlayerStatus.Looser:
      gameOver = "You lost!";
      icon = skull;
      break;
    default:
      gameOver = "You are Dead";
      icon = skull;
      break;
  }

  function showRoles() {
    DataController.GetDeadView(statusId, (deadView) => {
      DataController.ShowModalInfo(
        <SimpleRolesList players={deadView.PlayersRoles} />
      )
    }
    )
  }

  function showLogs() {
    DataController.GetDeadView(statusId, (deadView) => {
      DataController.ShowModalInfo(
        deadView.Logs.map((log) => <div key={log}> {log} </div>)
      )
    }
    )
  }

  const footerButtons = [
    {
      text: 'Roles',
      callback: () => showRoles()
    },
    {
      text: 'Logs',
      callback: () => showLogs()
    },
    {
      text: "Admin",
      admin: true,
      callback: () => {
        DataController.ShowModalInfo(<Admin />)
      }
    }
  ]

  return (
    <div className='mafia-container game-over-container'>
      <h1>{gameOver}</h1>
      <img alt='Game Over' className='game-over-icon' src={icon} />

      {GameOverPlayerStatus.Dead && <Footer isAdmin={isAdmin} buttons={footerButtons} />}

    </div>
  );
};

export default GameOver;
