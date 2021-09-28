import LOBBY_USER_BIG_MOCKS from "../mocks/LobbyUserBigMocks";
import PUBLIC_STATE_BIG from "../mocks/PublicStateBig";

const DemoController = {
  GetLobbyUserMocks: async () => {
    return LOBBY_USER_BIG_MOCKS;
  },
  GetPublicState: async () => {
    return PUBLIC_STATE_BIG;
  },
};

export default DemoController;
