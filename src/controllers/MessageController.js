import { toast } from "react-toastify";

const MessageController = {
  ShowInfo: (msg, timeout = 1200) => {
    toast(msg, { autoClose: timeout });
  },
  ShowError: (msg, resp) => {
    if (resp && resp.data && resp.data.error) {
      const error = resp.data.error;
      const code = error.code ? `Error Code ${error.code}. ` : "";
      const reason = error.reason ? `Reason ${error.reason}. ` : "";
      const desc = error.description ? `${error.description}.` : "";
      const err = `${msg} ${code}${reason}${desc}`;
      toast(err);
    } else {
      toast(msg);
    }
  },
};

export default MessageController;
