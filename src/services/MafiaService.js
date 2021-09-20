import axios from "axios";

async function callback_post(url, callback) {
  if (callback == null) {
    callback = _ => { }
  }
  try {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    let data = {};
    const res = axios({
      method: "post",
      url: url,
      data: data,
      config: config,
    });
    res.then(response => {
      console.log(response)
      callback(response)
    })
      .catch(err => {
        console.log(err)
        callback(err.response);
      })
  } catch (e) {
    console.log(e)
  }
}

const MafiaService = {
  JoinGame: async (player_name_ref, status_callback) => {
    const name = player_name_ref.current.value
    callback_post(
      `http://127.0.0.1:8000/join_game?name=${name}`,
      status_callback
    )
  },
  Disconnect: async (player_name, status_callback) => {
    const name = player_name
    callback_post(
      `http://127.0.0.1:8000/disconnect?name=${name}`,
      status_callback
    )
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
      /*const res = await axios.post(
        "http://127.0.0.1:8000/finish_day",
        data,
        config,
      );*/

      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/finish_day",
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
        url: "http://127.0.0.1:8000/finish_night",
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
