import axios from "axios";

const ReqMethod = {
  post: "post",
  get: "get",
};

async function callback_req(method, url, callback) {
  if (callback == null) {
    callback = (_) => {};
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
  MafiaVote: async (source, target, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/add_mafia_vote?source_pos=${source}&target_pos=${target}`,
      status_callback,
    );
  },
  Act: async (source, target, status_callback, target2 = -1) => {
    let url = `${process.env.REACT_APP_SERVER_URL}/act?source_pos=${source}&target_pos=${target}`;
    if (target2 !== -1) {
      url = url.concat(`&target2_pos=${target2}`);
    }
    callback_req(ReqMethod.post, url, status_callback);
  },
  RemoveMafiaVote: async (source, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/remove_mafia_vote?source_pos=${source}`,
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
  RemoveAct: async (source, status_callback) => {
    callback_req(
      ReqMethod.post,
      `${process.env.REACT_APP_SERVER_URL}/remove_act?source_pos=${source}`,
      status_callback,
    );
  },
  EndDay: async () => {
    console.log("End Day");

    try {
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
      let data = {};
      const res = await axios({
        method: "post",
        url: "{$process.env.REACT_APP_SERVER_URL}/finish_day",
        data: data,
        config: config,
      });
      console.log("res is " + res);
    } catch (e) {
      console.error(e);
    }
  },
  EndNight: async () => {
    console.log("End Night");
    try {
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
      let data = {};
      const res = await axios({
        method: "post",
        url: "{$process.env.REACT_APP_SERVER_URL}/finish_night",
        data: data,
        config: config,
      });
      console.log("res is " + res);
    } catch (e) {
      console.error(e);
    }
  },
};

export default MafiaService;
