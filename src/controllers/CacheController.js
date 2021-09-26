const CacheKey = {
  PlayerName: "MafiaPlayerName",
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
  IsPlayerNameSet: () => {
    const val = localStorage.getItem(CacheKey.PlayerName);
    return val !== null && val.toString().length > 0;
  },
};

export default CacheController;
