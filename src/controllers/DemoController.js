import LOBBY_USER_BIG_MOCKS from "../mocks/LobbyUserBigMocks";
import PUBLIC_STATE_BIG from "../mocks/PublicStateBig";
import PLAYER_STATE from "../mocks/PlayerStateMocks";
import PLAYER_STATE_BIG from "../mocks/PlayerStateBigMocks";
import SimpleScenario from "../mocks/SimpleScenario";

const DemoController = {
  GetLobbyUserMocks: async () => {
    return LOBBY_USER_BIG_MOCKS;
  },
  GetPublicState: async () => {
    return PUBLIC_STATE_BIG;
  },
  GetPlayerState: () => {
    return PLAYER_STATE;
  },


  GetAllScenarios: () => {
    const GetSimpleScenario = () => {
      return JSON.parse(JSON.stringify(SimpleScenario));
    };
    const ret = [ GetSimpleScenario(), GetSimpleScenario(), GetSimpleScenario() ];
    ret[0].name += '1';
    ret[1].name += '2';
    ret[2].name += '3';
    return ret;
  }
};

export default DemoController;
