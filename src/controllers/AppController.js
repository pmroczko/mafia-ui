import MafiaService from "../services/MafiaService";
import DemoController from "./DemoController";

async function GetLobbyPlayers(callback) {
  if (this.IsDebug) {
    return DemoController.GetLobbyUserMocks();
  }
  const map = (data) => {
    return data.map((serviceUser) => {
      return {
        Name: serviceUser.name,
        Id: serviceUser.id,
      };
    });
  };
  MafiaService.GetLobbyPlayers((resp) => {
    callback(map(resp.data));
  });
}

const AppController = {
  IsDebug: false,
  GetLobbyPlayers: GetLobbyPlayers,
};

export default AppController;
