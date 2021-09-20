import axios from "axios";

const MafiaService = {
  JoinGame: async (player_name_ref, status_callback) => {
    try {
      const name = player_name_ref.current.value
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
      let data = {};
      const res = axios({
        method: "post",
        url: `http://127.0.0.1:8000/join_game?name=${name}`,
        data: data,
        config: config,
      });
      res.then(response => {
        console.log(response)
        status_callback(response.status)
      })
        .catch(err => {
          console.log(err)
          status_callback(err.response.status);
        })
    } catch (e) {
      console.log(e)
    }
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
