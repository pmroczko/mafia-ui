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
  const [playerState, setPlayerState] = useState(null);
  const [messages, setMessages] = useState([]);
  const [publicState, setPublicState] = useState({
    IsDay: true,
    DayNumber: 0,
    Players: [],
  });
  const [targets, setTargets] = useState([]);
  const [voteTarget, setVoteTarget] = useState(null);

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

  function addMafiaVote(target) {
    console.log(`Add vote ${target}`);
    MafiaService.MafiaVote(position, target, (resp) => {
      if (resp.status === 200) {
        setVoteTarget(target);
      }
    });
  }

  function addTarget(target) {
    if (playerState.role.name === "BusDriver") {
      if (targets.length === 0) {
        console.log(`Add target ${target}`);
        setTargets([target]);
        return;
      } else if (targets.length === 1) {
        console.log(`Add target ${target}`);
        MafiaService.Act(
          position,
          target,
          (resp) => {
            if (resp.status === 200) {
              setTargets((old) => [old[0], target]);
            }
          },
          targets[0],
        );
      }
    } else {
      console.log(`Add target ${target}`);
      MafiaService.Act(position, target, (resp) => {
        if (resp.status === 200) {
          setTargets([target]);
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
    if (playerState.role.name === "BusDriver" && targets.length <= 1) {
      setTargets([]);
    } else {
      MafiaService.RemoveAct(position, (resp) => {
        if (resp.status === 200) {
          setTargets([]);
        }
      });
    }
  }

  function createPlayerTable() {
    let array = [];
    for (var player of publicState.Players) {
      const position = player.Position;
      array.push(
        <tr key={position}>
          <th scope='row'>{player.Name}</th>
          {player.IsDead && (
            <td>
              <s>{player.Name}</s>
            </td>
          )}
          {!player.IsDead && <td>{player.Name}</td>}
          {!player.IsDead && voteTarget !== position && (
            <MafiaGameButton
              text='Vote'
              callback={() => addMafiaVote(position)}
            />
          )}
          {!player.IsDead && voteTarget === position && (
            <MafiaGameButton
              text='Vote'
              callback={() => removeMafiaVote(position)}
            />
          )}
          {!player.IsDead && !targets.includes(position) && (
            <MafiaGameButton
              text='Target'
              callback={() => addTarget(position)}
            />
          )}
          {!player.IsDead && targets.includes(position) && (
            <MafiaGameButton
              text='Target'
              callback={() => removeTarget(position)}
            />
          )}
        </tr>,
      );
    }
    return array;
  }

  function showRole() {
    MessageController.ShowInfo(playerState.role.name);
  }

  return (
    <div>
      <Header text={`Mafia ${process.env.REACT_APP_VER}`} />
      <InfoLabel isDay={publicState.IsDay} dayNumber={publicState.DayNumber} />
      {playerState != null && (
        <div className='mafia-button-footer'>
          <Button onClick={showRole} className='mafia-button'>
            Role
          </Button>
        </div>
      )}
      {publicState != null && (
        <div className='players-container'>
          <table className='table'>
            <thead></thead>
            <tbody>{createPlayerTable()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Game;
