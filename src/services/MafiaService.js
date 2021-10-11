import axios from "axios";

const ReqMethod = {
  post: "post",
  get: "get",
};

async function callback_req(method, url, callback) {
  if (callback == null) {
    callback = (_) => { };
  }
  try {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    let data = {};
    const res = axios({
      method: method,
      url: url,
      data: data,
      config: config,
    });
    res
      .then((response) => {
        callback(response);
      })
      .catch((err) => {
        if (err.response) {
          callback(err.response);
        }
      });
  } catch (e) {
    console.log(e);
  }
}

const MafiaService = {
  /*========== GET ==========
  ========================= */

  GetPlayerPosition: async (player_name, status_callback) => {
    callback_req(
      ReqMethod.get,
      `${process.env.REACT_APP_SERVER_URL}/player_pos/${player_name}`,
      status_callback,
    );
  },
  GetPlayerState: async (player_position, status_callback) => {
    callback_req(
      ReqMethod.get,
      `${process.env.REACT_APP_SERVER_URL}/player_state/${player_position}`,
      status_callback,
    );
  },
  GetPlayerMessages: async (player_position, status_callback) => {
    callback_req(
      ReqMethod.get,
      `${process.env.REACT_APP_SERVER_URL}/messages/${player_position}`,
      status_callback,
    );
  },
  GetPublicState: async (status_callback) => {
    callback_req(
      ReqMethod.get,
      `${process.env.REACT_APP_SERVER_URL}/public_state`,
      status_callback,
    );
  },
  GetLobbyPlayers: async (status_callback) => {
    callback_req(
      ReqMethod.get,
      `${process.env.REACT_APP_SERVER_URL}/players_in_lobby`,
      status_callback,
    );
  },

  /*========== POST ==========
  ========================= */

  JoinGame: async (player_name_ref, status_callback) => {
    const name = player_name_ref.current.value;
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/join_game?name=${name}`,
      status_callback,
    );
  },
  Disconnect: async (player_name, status_callback) => {
    const name = player_name;
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/disconnect?name=${name}`,
      status_callback,
    );
  },
  StartGame: async (scenario_name_ref, status_callback) => {
    var name = scenario_name_ref.current.value;
    name = name.endsWith(".json") ? name : name + ".json";
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/start_game?scenario=${name}`,
      status_callback,
    );
  },
  EndGame: async (status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/end_game`,
      status_callback,
    );
  },
  AddMafiaVote: async (source, target, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/add_mafia_vote?source_pos=${source}&target_pos=${target}`,
      status_callback,
    );
  },
  Act: async (source, target, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/act?source_pos=${source}&target_pos=${target}`,
      status_callback);
  },
  RemoveMafiaVote: async (source, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/remove_mafia_vote?source_pos=${source}`,
      status_callback,
    );
  },
  RemoveAct: async (source, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/remove_act?source_pos=${source}`,
      status_callback,
    );
  },
  LynchMe: async (source, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/day_vote_kill?player_pos=${source}`,
      status_callback,
    );
  },
  PlayersPublicState: async (source, status_callback) => {
    callback_req(
      ReqMethod.get,
      `${process.env.REACT_APP_SERVER_URL}/players_public_status/${source}`,
      status_callback,
    );
  },
  EndDay: async () => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/finish_day`,
      () => { },
    );
  },
  EndNight: async () => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/finish_night`,
      () => { },
    );
  }
};

export default MafiaService;
