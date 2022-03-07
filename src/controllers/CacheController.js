
const CacheKey = {
  PlayerName: "MafiaPlayerName",
  PlayerPosition: "MafiaPlayerPosition",
  AdminPassword: "MafiaAdminPassword",
  Scenarios: "MafiaScenarios"
};
function isKeySet(key) {
  const val = localStorage.getItem(key);
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

  SaveScenario: (scenarioObject) => {
    var name = scenarioObject.name;
    //var scenarioString = JSON.stringify(scenarioObject);

    var scenarios = isKeySet(CacheKey.Scenarios) ? JSON.parse(localStorage.getItem(CacheKey.Scenarios)) : {};
    scenarios[name] = scenarioObject;
    localStorage.setItem(CacheKey.Scenarios, JSON.stringify(scenarios));
  },

  GetAllScenarios: () => {
    const scenarios =  isKeySet(CacheKey.Scenarios) ? JSON.parse(localStorage.getItem(CacheKey.Scenarios)) : {};
    /*for(var i in scenarios){
      const s = scenarios[i];
      scenarios[i] = JSON.parse(s);
    }*/
    return scenarios;
  },

  GetScenario: (name) => {
    if(!isKeySet(CacheKey.Scenarios)) {
      return null;
    }
    var scenarios = localStorage.getItem(CacheKey.Scenarios);
    if(!scenarios[name]){
      return null;
    }
    return JSON.parse(scenarios[name]);
  },

  DeleteScenario: (name) => {
    const scenarios = CacheController.GetAllScenarios();
    for(var i in scenarios) {
      const s = scenarios[i];
      if(s.name === name){
        delete scenarios[i];
        break;
      }
    }
    localStorage.setItem(CacheKey.Scenarios, JSON.stringify(scenarios));
    return true;
  }
};

export default CacheController;
