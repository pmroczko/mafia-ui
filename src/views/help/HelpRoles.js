import ROLES from "../../data/roles.json";
import DataController from "../../controllers/DataController";
import RoleHelp from "../../components/RoleHelp";

const HelpRoles = () => {
  const onRoleClicked = (event) => {
    DataController.ShowModalInfo(<RoleHelp roleName={event.target.id} />);
  };

  
  const cityRoles = [];
  const otherRoles = [];

  for(var roleName in ROLES){
    var role = ROLES[roleName]
    if(role.affiliation === "Town"){
      cityRoles[roleName] = role;
    } else {
      otherRoles[roleName] = role;
    }
  }

  const roleColor = (roleName) => {
    let role = ROLES[roleName]
    if (role.affiliation === "Town") {
      return "green"
    } else if (role.affiliation === "Mafia") {
      return "red"
    } else if (role.affiliation === "Neutral") {
      return "blue"
    } else {
      return "black"
    }
  }

  const getCityRoles = () => {
    return getList(cityRoles)
  }
  const getOtherRoles = () => {
    return getList(otherRoles)
  }

  const getList = (roles) => {
    const ret = [];
    for (var roleName in roles) {
      ret.push(
        <li key={roleName} id={roleName} onClick={onRoleClicked} style={{ color: roleColor(roleName) }}>
          {roleName}
        </li>,
      );
    }
    return ret;
  };

  return (
    <div className='help-roles-container'>
      <span className='help-roles-container-left'>
        <ul>{getCityRoles()}</ul>
      </span>
      <span className='help-roles-container-right'>
        <ul>{getOtherRoles()}</ul>
      </span>
    </div>
  );
};

export default HelpRoles;
