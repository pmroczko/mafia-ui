import MafiaService from "../services/MafiaService";
import DemoController from "./DemoController";
import MessageController from "./MessageController";

async function GetLobbyPlayers(callback) {
  if (this.IsDebug) {
    return DemoController.GetLobbyUserMocks();
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

const DataController = {
  IsDebug: false,
  GetLobbyPlayers: GetLobbyPlayers,
  GetPublicState: GetPublicState,
};

export default DataController;
