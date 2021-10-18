import ROLES from "../../data/roles.json";
import DataController from "../../controllers/DataController";
import RoleHelp from "../../components/RoleHelp";

const HelpRoles = () => {
  const onRoleClicked = (event) => {
    DataController.ShowModalInfo(<RoleHelp roleName={event.target.id} />);
  };

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

  const getList = () => {
    const ret = [];
    for (var roleName in ROLES) {
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
      <ul>{getList()}</ul>
    </div>
  );
};

export default HelpRoles;
