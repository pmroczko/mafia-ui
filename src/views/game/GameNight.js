import MafiaService from "../../services/MafiaService";
import MessageController from "../../controllers/MessageController";
import DataController from "../../controllers/DataController";
import MafiaGameButton from "../../components/buttons/MafiaGameButton";
import Footer from "../../components/Footer";

const GameNight = ({ playerState, publicState }) => {
  function showRole() {
    MessageController.ShowInfo(`Your role is ${playerState.RoleName}. `);
  }

  function learnMafia() {
    MafiaService.LearnMafia(playerState.Position, (resp) => {
      if (resp.status === 200) {
        for (const msg of resp.data) {
          MessageController.ShowInfo(msg);
        }
      }
    });
  }

  function mafiaVotes() {
    MafiaService.MafiaVotes(playerState.Position, (resp) => {
      if (resp.status === 200) {
        for (const msg of resp.data) {
          MessageController.ShowInfo(msg);
        }
      }
    });
  }

  const getPlayerByPos = (pos) => {
    return publicState.Players[pos];
  };

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
      playerState.Position,
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
    DataController.Act(playerState.Position, targetPos, cbSuccess, cbError);
  }

  function removeMafiaVote(target) {
    console.log(`Remove vote ${target}`);
    MafiaService.RemoveMafiaVote(playerState.Position, (resp) => {
      if (resp.status === 200) {
        MessageController.ShowInfo(`Removed vote: ${target}.`);
      }
    });
  }

  function removeTarget(target) {
    console.log(`Remove target ${target}`);
    MafiaService.RemoveAct(playerState.Position, (resp) => {
      if (resp.status === 200) {
        MessageController.ShowInfo(`Removed target: ${target}.`);
      }
    });
  }

  function actionStatus() {
    if (playerState.ActionsLeft === 0) {
      MessageController.ShowInfo(`You have no actions left.`);
    } else {
      if (playerState.Cooldown == 0 && playerState.ActionsLeft > 10) {
        MessageController.ShowInfo("You can use your action.");
      } else {
        MessageController.ShowInfo(
          `You have ${playerState.ActionsLeft} actions left.`,
        );
        if (playerState.Cooldown > 0) {
          if (playerState.Cooldown === 1) {
            MessageController.ShowInfo(`You have to wait for 1 night.`);
          } else {
            MessageController.ShowInfo(
              `You have to wait for ${playerState.Cooldown} nights.`,
            );
          }
        }
      }
    }
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

  const buttons = [
    {
      text: "Role",
      callback: () => showRole(),
    },
    {
      text: "Mafia",
      callback: () => learnMafia(),
    },
    {
      text: "Votes",
      callback: () => mafiaVotes(),
    },
    {
      text: "Action Status",
      callback: () => actionStatus(),
    },
  ];

  return (
    <div>
      <div className='players-container'>
        <table className='table'>
          <thead></thead>
          <tbody>{getPlayerRows()}</tbody>
        </table>
      </div>
      <Footer buttons={buttons} />
    </div>
  );
};

export default GameNight;
