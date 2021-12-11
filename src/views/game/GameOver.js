import GameOverPlayerStatus from "../../enums/GameOverPlayerStatus";
import skull from "../../graphics/skull.png";
import winner1 from "../../graphics/winner1.png";
import DataController from "../../controllers/DataController";
import SimpleRolesList from "../../components/helpers/SimpleRolesList";
import Footer from "../../components/Footer";

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

  const footerButtons = [
    {
      text: 'Roles',
      callback: () => showRoles()
    }
  ]

  return (
    <div className='mafia-container game-over-container'>
      <h1>{gameOver}</h1>
      <img alt='Game Over' className='game-over-icon' src={icon} />

      {GameOverPlayerStatus.Dead && <Footer buttons = {footerButtons}/>}

    </div>
  );
};

export default GameOver;
