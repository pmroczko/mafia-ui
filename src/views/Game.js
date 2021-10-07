import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import useInterval from "../hooks/UseInterval";
import MafiaService from "../services/MafiaService";
import { Button, Modal } from "react-bootstrap";
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
    MafiaVotes: [],
    IsDead: false,
    Cooldown: 0,
    ActionsLeft: 100,
    Description: []
  });
  const [messages, setMessages] = useState([]);
  const [publicState, setPublicState] = useState({
    IsDay: true,
    DayNumber: 0,
    Players: [],
    Winners: []
  });

  const getPlayerByPos = (pos) => {
    return publicState.Players[pos];
  };

  const getCurrentPlayer = () => {
    const currentPlayerName = CacheController.GetPlayerName();
    return publicState.Players.filter((p) => p.Name === currentPlayerName);
  };
  const toggleGameShown = () => {
    setIsGameShown(!isGameShown);
  };

  useInterval(async () => {
    DataController.GetPlayerState(position, (playerState) => {
      setPlayerState(playerState);
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
      MessageController.ShowError("Invalid vote target selected!");
    }
    const cbSuccess = () => {
      MessageController.ShowInfo(`You voted for ${player.Name}`);
    };
    const cbError = () => {
      MessageController.ShowError(`Unable to vote for ${player.Name}`);
    };
    DataController.MafiaVote(position, targetPos, cbSuccess, cbError);
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
    DataController.Act(position, targetPos, cbSuccess, cbError);
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
      buttonVote = playerState.MafiaVotes.includes(position) ? (
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

  function nightView() {
    return < div >
      <div className='players-container'>
        <table className='table'>
          <thead></thead>
          <tbody>{getPlayerRows()}</tbody>
        </table>
      </div>
      <div className='mafia-button-footer'>
        <Button onClick={showRole} className='mafia-button'>
          Role
        </Button>
        <Button onClick={learnMafia} className='mafia-button'>
          Mafia
        </Button>
        <Button onClick={mafiaVotes} className='mafia-button'>
          Votes
        </Button>
        <Button onClick={actionStatus} className='mafia-button'>
          Action Status
        </Button>
      </div>
    </div>
  }

  const [modalShow, setModalShow] = useState(false);

  function dayView() {
    return <div>
      <Button onClick={lynchMe} className='mafia-button'> Lynch me. </Button>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Body>
          {playerState.Description.map((line) =>
            <p key={line}>{line}</p>)}
        </Modal.Body>
      </Modal>
      <div className='mafia-button-footer'>
        <Button onClick={() => setModalShow(true)} className='mafia-button'> ? </Button>
      </div>
    </div >
  }

  function showRole() {
    //const currentPlayer = getCurrentPlayer();
    MessageController.ShowInfo(
      `Your role is ${playerState.RoleName}. You can use your action in ${playerState.Cooldown} days. You can use it ${playerState.ActionsLeft} more times.`,
    );
  }

  function learnMafia() {
    MafiaService.LearnMafia(position, (resp) => {
      if (resp.status === 200) {
        for (const msg of resp.data) {
          MessageController.ShowInfo(msg);
        }
      }
    })
  }

  function mafiaVotes() {
    MafiaService.MafiaVotes(position, (resp) => {
      if (resp.status === 200) {
        for (const msg of resp.data) {
          MessageController.ShowInfo(msg);
        }
      }
    })
  }

  function actionStatus() {
    if (playerState.ActionsLeft === 0) {
      MessageController.ShowInfo(`You have no actions left.`);
    }
    else {
      if (playerState.Cooldown == 0 && playerState.ActionsLeft > 10) {
        MessageController.ShowInfo("You can use your action.")
      } else {
        MessageController.ShowInfo(`You have ${playerState.ActionsLeft} actions left.`);
        if (playerState.Cooldown > 0) {
          if (playerState.Cooldown === 1) {
            MessageController.ShowInfo(`You have to wait for 1 night.`);
          } else {
            MessageController.ShowInfo(`You have to wait for ${playerState.Cooldown} nights.`);
          }
        }
      }
    }
  }

  function lynchMe() {
    MafiaService.LynchMe(position, (resp) => {
      if (resp.status === 200) {
        MessageController.ShowInfo(`Lynched self..`);
      }
    })
  }

  return (
    <div>
      <Header
        text={`Mafia ${process.env.REACT_APP_VER}`}
        onMenuShown={toggleGameShown}
        onMenuHidden={toggleGameShown}
      />
      <InfoLabel
        isDay={publicState.IsDay}
        dayNumber={publicState.DayNumber}
      />
      {isGameShown && publicState != null && playerState != null &&
        <div>
          {
            (publicState.Winners.length > 0 &&
              (publicState.Winners.includes(parseInt(position)) ? <div> YOU WIN! </div> : <div> YOU LOOSE! </div>))
            ||
            <div>
              {!playerState.IsDead && publicState.IsDay && dayView()}
              {!playerState.IsDead && !publicState.IsDay && nightView()}
              {playerState.IsDead && <div> YOU ARE DEAD! </div>}
            </div>
          }
        </div>
      }
    </div>
  );
}

export default Game;
