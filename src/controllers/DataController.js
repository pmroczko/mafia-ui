import MafiaService from "../services/MafiaService";
import DemoController from "./DemoController";
import { Button } from "react-bootstrap";

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

async function GetPlayerView(player_name, callback) {
  MafiaService.PlayerView(player_name, (resp) => {
    if (resp.status === 200) {
      const playerState = this.IsDebug ? DemoController.GetPlayerState() : resp.data.other_players_state.map((player_status, _) => {
        return {
          IsDead: player_status.is_dead,
          Name: player_status.name,
          Position: player_status.position,
          RoleName: player_status.role_name,
          VoteTarget: player_status.vote_target,
        };
      });
      const playerView = {
        IsDay: this.IsDebug ? true : resp.data.time_of_day === "Day",
        DayNumber: resp.data.day_number,
        Winners: resp.data.winners,
        Scenario: resp.data.scenario,
        SecondsLeft: resp.data.seconds_left,
        Name: resp.data.name,
        RoleName: resp.data.role_name,
        Position: resp.data.position,
        Messages: resp.data.messages,
        PlayersState: playerState,
        IsDead: resp.data.is_dead,
        Cooldown: resp.data.cooldown,
        ActionsLeft: resp.data.actions_left,
        ExeTarget: resp.data.exe_target,
        Targets: resp.data.targets,
        MafiaVotes: resp.data.mafia_vote,
      }
      callback(playerView)
    }
  });
}

async function GetDeadKnowledge(callback) {
  MafiaService.GetDeadKnowledge((resp) => {
    if (resp.status === 200) {
      const PlayersRoles = resp.data.map((player, _) => {
        return {
          Name: player.name,
          RoleName: player.role_name,
          IsDead: player.is_dead,
        };
      });
      callback(PlayersRoles);
    }
  })
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

const DataController = {
  IsDebug: false,
  GetLobbyPlayers: GetLobbyPlayers,
  GetDeadKnowledge: GetDeadKnowledge,
  MafiaVote: MafiaVote,
  GetModalText: GetModalText,
  ShowModalInfo: ShowModalinfo,
  ShowModalConfirm: ShowModalConfirm,
  BindModal: BindModal,
  Act: Act,
  GetPlayerView: GetPlayerView,
};

export default DataController;
