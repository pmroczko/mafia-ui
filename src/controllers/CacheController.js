const CacheKey = {
  PlayerName: "MafiaPlayerName",
  PlayerPosition: "MafiaPlayerPosition",
};

const CacheController = {
  SetPlayerName: (name) => {
    localStorage.setItem(CacheKey.PlayerName, name);
  },
  GetPlayerName: () => {
    return localStorage.getItem(CacheKey.PlayerName);
  },
  ClearPlayerName: () => {
    localStorage.removeItem(CacheKey.PlayerName);
  },
  SetPlayerPosition: (position) => {
    localStorage.setItem(CacheKey.PlayerPosition, position);
  },
  GetPlayerPosition: () => {
    return localStorage.getItem(CacheKey.PlayerPosition);
  },
  IsPlayerNameSet: () => {
    const val = localStorage.getItem(CacheKey.PlayerName);
    return val !== null && val.toString().length > 0;
  },
};

export default CacheController;
