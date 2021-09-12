import axios from "axios";

const MafiaService = {
  EndDay: async () => {
    console.log("End Day");

    try {
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
      let data = {};
      const res = await axios.post(
        "http://127.0.0.1:8000/finish_day",
        data,
        config,
      );
      console.log("res is " + res);
    } catch (e) {
      console.error(e);
    }
  },
  EndNight: () => {
    console.log("End Night");
  },
};

export default MafiaService;
