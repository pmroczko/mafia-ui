
const CacheKey = {
  PlayerName: "MafiaPlayerName",
  PlayerPosition: "MafiaPlayerPosition",
  AdminPassword: "MafiaAdminPassword",
};
function isKeySet(key) {
  const val = localStorage.getItem(CacheKey.PlayerName);
  return val !== null && val.toString().length > 0;
}

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
    return isKeySet(CacheKey.PlayerName);
  },
  SetAdminPassword: (password) => {
    localStorage.setItem(CacheKey.AdminPassword, password);
  },
  GetAdminPassword: () => {
    return localStorage.getItem(CacheKey.AdminPassword);
  },
  IsAdminPasswordSet: () => {
    return isKeySet(CacheKey.AdminPassword);
  },
};

export default CacheController;
