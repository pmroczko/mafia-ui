import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useInterval from "../hooks/UseInterval";
import MafiaService from "../services/MafiaService";
import { Button } from "react-bootstrap";
import Header from "../components/Header";

function Player() {
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
          toast(msg.text, { autoClose: 15000 });
        }
      }
    });
    MafiaService.GetPublicState((resp) => {
      if (resp.status === 200) {
        setPublicState(resp.data);
      }
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
    for (const [idx, [name, is_dead]] of publicState.players_state.entries()) {
      array.push(
        <tr key={idx}>
          <th scope='row'>{idx}</th>
          {is_dead && (
            <td>
              <s>{name}</s>
            </td>
          )}
          {!is_dead && <td>{name}</td>}
          {is_dead === false && voteTarget !== idx && (
            <td>
              {" "}
              <Button onClick={() => addMafiaVote(idx)}> Vote </Button>
            </td>
          )}
          {is_dead === false && voteTarget === idx && (
            <td>
              {" "}
              <Button onClick={() => removeMafiaVote(idx)}> Vote </Button>
            </td>
          )}
          {is_dead === false && !targets.includes(idx) && (
            <td>
              {" "}
              <Button onClick={() => addTarget(idx)}> Target </Button>
            </td>
          )}
          {is_dead === false && targets.includes(idx) && (
            <td>
              {" "}
              <Button onClick={() => removeTarget(idx)}> Target </Button>
            </td>
          )}
        </tr>,
      );
    }
    return array;
  }

  function showRole() {
    toast(playerState.role.name);
  }

  return (
    <div>
      <Header text='Player' />
      <ToastContainer />
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

export default Player;
