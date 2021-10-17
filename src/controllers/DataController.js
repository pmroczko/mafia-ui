import MafiaService from "../services/MafiaService";
import DemoController from "./DemoController";

async function GetLobbyPlayers(callback) {
  if (this.IsDebug) {
    const users = await DemoController.GetLobbyUserMocks();
    callback(users);
    return;
  }

  const mapLobbyPlayers = (data) => {
    if (!data) {
      return [];
    }
    return data.map((serviceUser, idx) => {
      return {
        Position: idx,
        Name: serviceUser.name,
        Id: serviceUser.id,
        ShortId: ("" + serviceUser.id).substr(0, 9) + "...",
      };
    });
  };

  MafiaService.GetLobbyPlayers((resp) => {
    if (resp.status !== 200) {
      return [];
      //TODO: put this message once only:
      //MessageController.ShowError("", resp);
    } else {
      callback(mapLobbyPlayers(resp.data));
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
        Scenario: resp.data.scenario,
        Winners: resp.data.winners,
      };
      callback(publicState);
    }
  });
}

async function GetPlayerState(player_position, callback) {
  MafiaService.GetPlayerState(player_position, (resp) => {
    if (resp.status == 200) {
      const playerState = {
        RoleName: resp.data.role.name,
        Targets: resp.data.state.targets,
        MafiaVotes: resp.data.state.mafia_vote,
        IsDead: resp.data.state.is_dead,
        Cooldown: resp.data.state.cooldown,
        ActionsLeft: resp.data.role.action_count - resp.data.state.actions_done,
        Description: resp.data.role.description,
        Position: player_position,
      };
      callback(playerState);
    }
  });
}

async function GetPlayersPublicStatus(player_position, callback) {
  MafiaService.PlayersPublicState(player_position, (resp) => {
    if (resp.status == 200) {
      const playersPublicStatus = resp.data.map((player_status, _) => {
        return {
          IsDead: player_status.is_dead,
          Name: player_status.name,
          Position: player_status.position,
          RoleName: player_status.role_name,
          VoteTarget: player_status.vote_target,
        };
      });
      callback(playersPublicStatus);
    }
  });
}

async function MafiaVote(position, targetPos, cbSuccess, cbFailure) {
  await MafiaService.AddMafiaVote(position, targetPos, (resp) => {
    resp.status === 200 ? cbSuccess() : cbFailure();
  });
}

async function Act(position, target, cbSuccess, cbError) {
  await MafiaService.Act(position, target, (resp) => {
    resp.status === 200 ? cbSuccess() : cbError();
  });
}

var onShown;
var onHidden;

const ShowModalinfo = (text) => {
  window.Modaltext = text;
  onShown();
};

const GetModalText = () => {
  return window.Modaltext;
};

const BindModal = (onShownCallback, onHiddenCallback) => {
  onShown = onShownCallback;
  onHidden = onHiddenCallback;
};

const DataController = {
  IsDebug: false,
  GetLobbyPlayers: GetLobbyPlayers,
  GetPublicState: GetPublicState,
  GetPlayerState: GetPlayerState,
  GetPlayersPublicStatus: GetPlayersPublicStatus,
  MafiaVote: MafiaVote,
  GetModalText: GetModalText,
  ShowModalInfo: ShowModalinfo,
  BindModal: BindModal,
  Act: Act,
};

export default DataController;
