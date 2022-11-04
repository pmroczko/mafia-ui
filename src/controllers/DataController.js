import MafiaService from "../services/MafiaService";
import DemoController from "./DemoController";
import { Button } from "react-bootstrap";
import CacheController from "./CacheController";

async function GetLobbyView(server_id, lobby_callback, game_callback) {
  if (this.IsDebug) {
    const users = await DemoController.GetLobbyUserMocks();
    lobby_callback({
      HostName: "TestHost",
      Players: users
    });
    return;
  }

  MafiaService.LobbyView(server_id, (data) => {
    let lobby_state = data[0]
    if (lobby_state === "Lobby") {
      let lobby_data = data[1]
      const lobbyPlayers = lobby_data.players.map((serviceUser, idx) => {
        return {
          Position: idx,
          Name: serviceUser.name,
          Id: serviceUser.id,
          ShortId: ("" + serviceUser.id).substr(0, 9) + "...",
        };
      });
      const lobbyView = {
        HostName: lobby_data.host_name,
        Players: lobbyPlayers
      };
      lobby_callback(lobbyView);
    }
    else {
      game_callback()
    }
  });
}

async function GetPlayerView(server_id, player_name, callback) {
  MafiaService.PlayerView(server_id, player_name, (data) => {
    const playerState = this.IsDebug ? DemoController.GetPlayerState() : data.other_players_state.map((player_status, _) => {
      return {
        IsDead: player_status.is_dead,
        Name: player_status.name,
        Position: player_status.position,
        RoleName: player_status.role_name,
        VoteTarget: player_status.vote_target,
      };
    });
    const playerView = {
      HostName: data.host_name,
      IsDay: this.IsDebug ? true : data.time_of_day === "Day",
      DayNumber: data.day_number,
      Winners: data.winners,
      Scenario: data.scenario,
      TimeLeft: data.time_left,
      Name: data.name,
      RoleName: data.role_name,
      RoleRules: data.role_rules,
      Position: data.position,
      Messages: data.messages,
      PlayersState: playerState,
      IsDead: data.is_dead,
      Cooldown: data.cooldown,
      ActionsLeft: data.actions_left,
      ExeTarget: data.exe_target,
      Targets: data.targets,
      MafiaVotes: data.mafia_vote,
    }
    callback(playerView)
  });
}

async function GetDeadView(server_id, callback) {
  MafiaService.GetDeadView(server_id, (data) => {
    const PlayersRoles = data.state.map((player, _) => {
      return {
        Name: player.name,
        RoleName: player.role_name,
        IsDead: player.is_dead,
      };
    });
    const DeadView = {
      PlayersRoles: PlayersRoles,
      Logs: data.logs
    }
    callback(DeadView);
  })
}


var onShown;
var onHidden;

const ShowModalinfo = (text) => {
  window.Modaltext = text;
  onShown();
};

const ShowModalConfirm = (text, confirmText, callback) => {
  window.Modaltext = (
    <div className="mafia-modal-confirm-container ">
      <p>{text}</p>
      <Button onClick={() => { callback(); onHidden() }}>{confirmText}</Button>
    </div>)
  onShown();
}

const GetModalText = () => {
  return window.Modaltext;
};

const BindModal = (onShownCallback, onHiddenCallback) => {
  onShown = onShownCallback;
  onHidden = onHiddenCallback;
};

const GetAllScenarios = () => {
  return CacheController.GetAllScenarios();
  //return DemoController.GetAllScenarios();
}

const GetScenario = (name) => {
  const s = CacheController.GetScenario(name);
  return s !== null ? s : DemoController.GetDemoScenario();
  //return DemoController.GetAllScenarios()[0];
}

const DeleteScenario = (name) => {
  return CacheController.DeleteScenario(name);
}

const UpdateScenario = (name) => {

}

const SaveScenario = (scenarioObj) => {
  CacheController.SaveScenario(scenarioObj);
}

const DataController = {
  IsDebug: false,
  GetLobbyView: GetLobbyView,
  GetDeadView: GetDeadView,
  GetModalText: GetModalText,
  ShowModalInfo: ShowModalinfo,
  ShowModalConfirm: ShowModalConfirm,
  BindModal: BindModal,
  GetPlayerView: GetPlayerView,
  GetAllScenarios: GetAllScenarios,
  GetScenario: GetScenario,
  DeleteScenario: DeleteScenario,
  UpdateScenario: UpdateScenario,
  SaveScenario: SaveScenario
};

export default DataController;
