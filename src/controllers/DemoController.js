import LOBBY_USER_BIG_MOCKS from "../mocks/LobbyUserBigMocks";
import PUBLIC_STATE_BIG from "../mocks/PublicStateBig";
import PLAYER_STATE from "../mocks/PlayerStateMocks";
import PLAYER_STATE_BIG from "../mocks/PlayerStateBigMocks";

const DemoController = {
  GetLobbyUserMocks: async () => {
    return LOBBY_USER_BIG_MOCKS;
  },
  GetPublicState: async () => {
    return PUBLIC_STATE_BIG;
  },
  GetPlayerState: () => {
    return PLAYER_STATE;
  }
};

export default DemoController;
