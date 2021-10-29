import GameOverPlayerStatus from "../../enums/GameOverPlayerStatus";
import skull from "../../graphics/skull.png";
import winner1 from "../../graphics/winner1.png";
import MafiaGameButton from "../../components/buttons/MafiaGameButton";
import DataController from "../../controllers/DataController";
import SimpleRolesList from "../../components/SimpleRolesList";

const GameOver = ({ gameOverStatus }) => {
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
    DataController.GetDeadKnowledge((players) => {
      DataController.ShowModalInfo(
        <SimpleRolesList players={players} />
      )
    }
    )
  }

  return (
    <div className='mafia-container game-over-container'>
      <h1>{gameOver}</h1>
      <img className='game-over-icon' src={icon} />
      {gameOverStatus == GameOverPlayerStatus.Dead && <MafiaGameButton text="Roles" callback={showRoles} />}

    </div>
  );
};

export default GameOver;
