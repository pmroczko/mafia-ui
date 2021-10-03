import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import useInterval from "../hooks/UseInterval";
import MafiaService from "../services/MafiaService";
import { Button } from "react-bootstrap";
import Header from "../components/Header";
import DataController from "../controllers/DataController";
import MessageController from "../controllers/MessageController";
import MafiaGameButton from "../components/buttons/MafiaGameButton";
import CacheController from "../controllers/CacheController";
import InfoLabel from "../components/InfoLabel";

function Game() {
  const position = CacheController.GetPlayerPosition();
  const [isGameShown, setIsGameShown] = useState(true);
  const [playerState, setPlayerState] = useState({
    RoleName: "None",
    Targets: [],
    MafiaVotes: []
  });
  const [messages, setMessages] = useState([]);
  const [publicState, setPublicState] = useState({
    IsDay: true,
    DayNumber: 0,
    Players: [],
  });

  const getPlayerByPos = (pos) => {
    return publicState.Players[pos];
  };
  const toggleGameShown = () => {
    setIsGameShown(!isGameShown);
  };
  useInterval(async () => {
    DataController.GetPlayerState(position, (playerState) => {
      setPlayerState(playerState)
    })
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

  function addMafiaVote(targetPos) {
    console.log(`Add vote ${targetPos}`);
    const player = getPlayerByPos(targetPos);
    if (!player) {
      MessageController.ShowError("Invalid vote target selected!");
    }
    const cbSuccess = () => {
      MessageController.ShowInfo(`You voted for ${player.Name}`);
    };
    const cbError = () => {
      MessageController.ShowError(`Unable to vote for ${player.Name}`);
    };
    DataController.MafiaVote(
      position,
      targetPos,
      cbSuccess,
      cbError,
    );
  }

  function addTarget(targetPos) {
    console.log(`Add target ${targetPos}`);
    const player = getPlayerByPos(targetPos);
    if (!player) {
      MessageController.ShowError("Invalid target selected!");
    }
    const cbSuccess = () => {
      MessageController.ShowInfo(`Targeted ${player.Name}`);
    };
    const cbError = () => {
      MessageController.ShowError(`Error while targeting ${player.Name}`);
    };
    DataController.Act(
      position,
      targetPos,
      cbSuccess,
      cbError,
    );
  }

  function removeMafiaVote(target) {
    console.log(`Remove vote ${target}`);
    MafiaService.RemoveMafiaVote(position, (resp) => {
      if (resp.status === 200) {
        MessageController.ShowInfo(`Removed vote: ${target}.`);
      }
    });
  }

  function removeTarget(target) {
    console.log(`Remove target ${target}`);
    MafiaService.RemoveAct(position, (resp) => {
      if (resp.status === 200) {
        MessageController.ShowInfo(`Removed target: ${target}.`);
      }
    });
  }

  function getPlayerRow(player) {
    const position = player.Position;
    const emptyTd = <td />;

    var buttonVote = emptyTd;
    var buttonTarget = emptyTd;
    if (!player.IsDead) {
      buttonVote =
        playerState.MafiaVotes.includes(position) ? (
          <MafiaGameButton
            text='Mafia vote'
            callback={() => removeMafiaVote(position)}
          />
        ) : (
          <MafiaGameButton
            text='Mafia Vote'
            callback={() => addMafiaVote(position)}
          />
        );

      buttonTarget = playerState.Targets.includes(position) ? (
        <MafiaGameButton
          text='target'
          callback={() => removeTarget(position)}
        />
      ) : (
        <MafiaGameButton text='Target' callback={() => addTarget(position)} />
      );
    }
    return (
      <tr key={position}>
        <th scope='row'>{player.Position}</th>
        <td>{player.Name}</td>
        {buttonVote}
        {buttonTarget}
      </tr>
    );
  }

  function getPlayerRows() {
    let array = [];
    for (var player of publicState.Players) {
      array.push(getPlayerRow(player));
    }
    return array;
  }

  function showRole() {
    MessageController.ShowInfo(`Your role is ${playerState.RoleName}`);
  }

  return (
    <div>
      <Header
        text={`Mafia ${process.env.REACT_APP_VER}`}
        onMenuShown={toggleGameShown}
        onMenuHidden={toggleGameShown}
      />
      {isGameShown && (
        <div>
          <InfoLabel
            isDay={publicState.IsDay}
            dayNumber={publicState.DayNumber}
          />
          {publicState != null && (
            <div className='players-container'>
              <table className='table'>
                <thead></thead>
                <tbody>{getPlayerRows()}</tbody>
              </table>
            </div>
          )}
          {playerState != null && (
            <div className='mafia-button-footer'>
              <Button onClick={showRole} className='mafia-button'>
                Your Role
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
