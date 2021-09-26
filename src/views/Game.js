import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import useInterval from "../hooks/UseInterval";
import MafiaService from "../services/MafiaService";
import { Button } from "react-bootstrap";
import Header from "../components/Header";
import DataController from "../controllers/DataController";
import MessageController from "../controllers/MessageController";

function Game() {
  const queryParams = new URLSearchParams(window.location.search);
  const position = queryParams.get("position");
  const [playerState, setPlayerState] = useState(null);
  const [messages, setMessages] = useState([]);
  const [publicState, setPublicState] = useState(null);
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
      array.push(
        <tr key={player.Position}>
          <th scope='row'>{player.Name}</th>
          {player.IsDead && (
            <td>
              <s>{player.Position}</s>
            </td>
          )}
          {!player.IsDead && <td>{player.Name}</td>}
          {!player.IsDead && voteTarget !== player.Position && (
            <td>
              {" "}
              <Button onClick={() => addMafiaVote(player.Position)}>
                {" "}
                Vote{" "}
              </Button>
            </td>
          )}
          {player.IsDead && voteTarget === player.Position && (
            <td>
              {" "}
              <Button onClick={() => removeMafiaVote(player.Position)}>
                {" "}
                Vote{" "}
              </Button>
            </td>
          )}
          {player.IsDead && !targets.includes(player.Position) && (
            <td>
              {" "}
              <Button onClick={() => addTarget(player.Position)}>
                {" "}
                Target{" "}
              </Button>
            </td>
          )}
          {player.IsDead && targets.includes(player.Position) && (
            <td>
              {" "}
              <Button onClick={() => removeTarget(player.Position)}>
                {" "}
                Target{" "}
              </Button>
            </td>
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
      {playerState != null && (
        <div>
          <Button onClick={showRole}> Role </Button>
          {publicState.time_of_day === "Day" && <h1>Day</h1>}
          {publicState.time_of_day !== "Day" && <h1>Night</h1>}
        </div>
      )}
      {publicState != null && (
        <div className='players-container '>
          <table className='table'>
            <tbody>{createPlayerTable()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Game;
