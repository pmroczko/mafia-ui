import DemoController from "./DemoController";

async function GetLobbyUsers() {
  if (this.IsDebug) {
    return DemoController.GetLobbyUserMocks();
  }
}

function ToggleShowMenu() {
  window.mafiaMenu = !window.mafiaMenu;
}

function IsMenuShown() {
  return window.mafiaMenu === true;
}

const AppController = {
  IsDebug: true,
  ToggleShowMenu: ToggleShowMenu,
  IsMenuShown: IsMenuShown,
  GetLobbyUsers: GetLobbyUsers,
};

export default AppController;
