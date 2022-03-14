import axios from "axios";
import MessageController from "../controllers/MessageController";

const ReqMethod = {
  post: "post",
  get: "get",
};

async function callback_req(method, url, callback, data = {}) {
  if (callback == null) {
    callback = (_) => { };
  }
  try {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    const res = axios({
      method: method,
      url: url,
      data: data,
      config: config,
    });
    res
      .then((response) => {
        if (response.data.is_ok) {
          callback(response.data.payload);
        } else {
          MessageController.ShowInfo(response.data.err);
          console.log(response.data.err);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  } catch (e) {
    console.log(e);
  }
}

const MafiaService = {
  /*========== GET ==========
  ========================= */

  LobbyView: async (server_id, status_callback) => {
    callback_req(
      ReqMethod.get,
      `${process.env.REACT_APP_SERVER_URL}/lobby_view/${server_id}`,
      status_callback,
    );
  },
  PlayerView: async (server_id, player_name, status_callback) => {
    callback_req(
      ReqMethod.get,
      `${process.env.REACT_APP_SERVER_URL}/player_view/${server_id}/${player_name}`,
      status_callback,
    );
  },
  GetDeadKnowledge: async (server_id, status_callback) => {
    callback_req(
      ReqMethod.get,
      `${process.env.REACT_APP_SERVER_URL}/all_roles_for_dead/${server_id}`,
      status_callback,
    );
  },

  /*========== POST ==========
  ========================= */

  CreateGame: async (server_id_ref, player_name_ref, status_callback) => {
    const name = player_name_ref.current.value;
    const server_id = server_id_ref.current.value;
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/create_game?name=${name}&id=${server_id}`,
      status_callback,
    );
  },
  JoinGame: async (server_id_ref, player_name_ref, status_callback) => {
    const name = player_name_ref.current.value;
    const server_id = server_id_ref.current.value;
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/join_game?name=${name}&id=${server_id}`,
      status_callback,
    );
  },
  Disconnect: async (server_id, player_name, status_callback) => {
    const name = player_name;
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/disconnect?name=${name}&id=${server_id}`,
      status_callback,
    );
  },
  StartGame: async (server_id, scenario, player_name, shuffle, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/start_game?shuffle=${shuffle}&id=${server_id}&name=${player_name}`,
      status_callback,
      scenario
    );
  },
  EndGame: async (server_id, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/end_game?id=${server_id}`,
      status_callback,
    );
  },
  AddMafiaVote: async (server_id, source, target, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/add_mafia_vote?source_pos=${source}&target_pos=${target}&id=${server_id}`,
      status_callback,
    );
  },
  Act: async (server_id, source, target, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/act?source_pos=${source}&target_pos=${target}&id=${server_id}`,
      status_callback);
  },
  RemoveMafiaVote: async (server_id, source, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/remove_mafia_vote?source_pos=${source}&id=${server_id}`,
      status_callback,
    );
  },
  RemoveAct: async (server_id, source, target, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/remove_act?source_pos=${source}&target_pos=${target}&id=${server_id}`,
      status_callback,
    );
  },
  LynchMe: async (server_id, source, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/day_vote_kill?player_pos=${source}&id=${server_id}`,
      status_callback,
    );
  },
  EndDay: async (server_id) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/finish_day?id=${server_id}`,
      () => { },
    );
  },
  EndNight: async (server_id) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/finish_night?id=${server_id}`,
      () => { },
    );
  }
};

export default MafiaService;
