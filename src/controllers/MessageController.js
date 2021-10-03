import { toast } from "react-toastify";
import config from "../config.json";

const MessageController = {
  ShowInfo: (msg, timeout = config.TOAST_TIMEOUT_MS) => {
    toast(msg, { autoClose: timeout });
  },
  ShowError: (msg, resp, timeout = config.TOAST_TIMEOUT_MS) => {
    if (resp && resp.data && resp.data.error) {
      const error = resp.data.error;
      const code = error.code ? `Error Code ${error.code}. ` : "";
      const reason = error.reason ? `Reason ${error.reason}. ` : "";
      const desc = error.description ? `${error.description}.` : "";
      const err = `${msg} ${code}${reason}${desc}`;
      toast(err, { autoClose: timeout });
    } else {
      toast(msg, { autoClose: timeout });
    }
  },
};

export default MessageController;
