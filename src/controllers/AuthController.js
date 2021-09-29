import { sha256 } from "js-sha256";
const ADMIN_PASS =
  "b9aac01605855078e330997b3738612ea6341e9074e286910b6e00f195d1140b";
const AuthController = {
  Authenticate: (password) => {
    const pass = sha256(password);
    return pass === ADMIN_PASS;
  },
};

export default AuthController;
