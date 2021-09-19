import DemoController from "./DemoController";

async function GetLobbyUsers() {
  if (this.IsDebug) {
    return DemoController.GetLobbyUserMocks();
  }
}

const AppController = {
  IsDebug: true,
  GetLobbyUsers: GetLobbyUsers,
};

export default AppController;
