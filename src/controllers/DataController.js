import MafiaService from "../services/MafiaService";
import DemoController from "./DemoController";

async function GetLobbyPlayers(callback) {
  if (this.IsDebug) {
    const users = await DemoController.GetLobbyUserMocks();
    callback(users);
    return;
  }
  const map = (data) => {
    if (!data) {
      return [];
    }
    return data.map((serviceUser) => {
      return {
        Name: serviceUser.name,
        Id: serviceUser.id,
      };
    });
  };

  MafiaService.GetLobbyPlayers((resp) => {
    if (resp.status !== 200) {
      return [];
      //TODO: put this message once only:
      //MessageController.ShowError("", resp);
    } else {
      callback(map(resp.data));
    }
  });
}

async function GetPublicState(callback) {
  if (this.IsDebug) {
    callback(await DemoController.GetPublicState());
    return;
  }
  MafiaService.GetPublicState((resp) => {
    if (resp.status === 200) {
      const players = resp.data.players_state.map((p, idx) => {
        return {
          Position: idx,
          Name: p[0],
          IsDead: p[1] === true,
        };
      });
      const publicState = {
        Players: players,
        IsDay: resp.data.time_of_day === "Day",
        DayNumber: resp.data.day_number,
        Winners: resp.data.winners,
      };
      callback(publicState);
    }
  });
}

async function MafiaVote(position, targetPos, cbSuccess, cbFailure) {
  await MafiaService.MafiaVote(position, targetPos, (resp) => {
    resp.status === 200 ? cbSuccess() : cbFailure();
  });
}

async function Act(position, targetArray, cbSuccess, cbError) {
  if (targetArray.length < 2) {
    targetArray[1] = -1;
  }
  await MafiaService.Act(
    position,
    targetArray[0],
    (resp) => {
      resp.status === 200 ? cbSuccess() : cbError();
    },
    targetArray[1],
  );
}

const DataController = {
  IsDebug: false,
  GetLobbyPlayers: GetLobbyPlayers,
  GetPublicState: GetPublicState,
  MafiaVote: MafiaVote,
  Act: Act,
};

export default DataController;
