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
import GameRoles from "../enums/GameRoles";

function Game() {
  const position = CacheController.GetPlayerPosition();
  const [isGameShown, setIsGameShown] = useState(true);
  const [playerState, setPlayerState] = useState(null);
  const [messages, setMessages] = useState([]);
  const [publicState, setPublicState] = useState({
    IsDay: true,
    DayNumber: 0,
    Players: [],
  });
  const [targets, setTargets] = useState([]);
  const [voteTarget, setVoteTarget] = useState(null);

  const getPlayerByPos = (pos) => {
    return publicState.Players[pos];
  };
  const toggleGameShown = () => {
    setIsGameShown(!isGameShown);
  };
  useInterval(async () => {
    MafiaService.GetPlayerState(position, (resp) => {
      if (resp.status === 200) {
        setPlayerState(resp.data);
      }
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

  function addMafiaVote(targetPos) {
    console.log(`Add vote ${targetPos}`);
    const player = getPlayerByPos(targetPos);
    if (!player) {
      MessageController.ShowError("Invalid target selected!");
    }
    MafiaService.MafiaVote(position, targetPos, (resp) => {
      if (resp.status === 200) {
        setVoteTarget(targetPos);
      }
    });
  }

  function addTarget(targetPos) {
    console.log(`Add target ${targetPos}`);
    if (playerState.role.name === GameRoles.BusDriver) {
      if (targets.length === 0) {
        setTargets([targetPos]);
        return;
      } else if (targets.length === 1) {
        MafiaService.Act(
          position,
          targetPos,
          (resp) => {
            if (resp.status === 200) {
              setTargets((old) => [old[0], targetPos]);
            }
          },
          targets[0],
        );
      }
    } else {
      MafiaService.Act(position, targetPos, (resp) => {
        if (resp.status === 200) {
          setTargets([targetPos]);
        }
      });
    }
  }

  function removeMafiaVote(target) {
    console.log(`Remove vote ${target}`);
    MafiaService.RemoveMafiaVote(position, (resp) => {
      if (resp.status === 200) {
        setVoteTarget([]);
      }
    });
  }

  function removeTarget(target) {
    console.log(`Remove target ${target}`);
    if (playerState.role.name === GameRoles.BusDriver && targets.length <= 1) {
      setTargets([]);
    } else {
      MafiaService.RemoveAct(position, (resp) => {
        if (resp.status === 200) {
          setTargets([]);
        }
      });
    }
  }

  function getPlayerRow(player) {
    const position = player.Position;
    const emptyTd = <td />;

    var buttonVote = emptyTd;
    var buttonTarget = emptyTd;
    if (!player.IsDead) {
      buttonVote =
        voteTarget === position ? (
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

      buttonTarget = targets.includes(position) ? (
        <MafiaGameButton
          text='Target'
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
      const position = player.Position;
      array.push(getPlayerRow(player));
    }
    return array;
  }

  function showRole() {
    MessageController.ShowInfo(playerState.role.name);
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
