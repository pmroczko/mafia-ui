import ROLES from "./data/roles.json";
import DataController from "../../controllers/DataController";

const HelpRoles = () => {
  const onRoleClicked = (event) => {
    const role = ROLES[event.target.id];
    const roleInfo = (
      <div className='mafia-role-modal'>
        <h1>{role.name}</h1>
        <div className='mafia-role-subheader'>{`${role.affiliation} member`}</div>
        <hr />
        <div className='mafia-role-modal-body'>
          {`Action Count: ${role.action_count}`}
          <br />
          {`Action Cooldown: ${role.action_cooldown}`}
          <hr />
          {role.description}
        </div>
      </div>
    );
    DataController.ShowModalInfo(roleInfo);
  };
  const getList = () => {
    const ret = [];
    for (var roleName in ROLES) {
      ret.push(
        <li key={roleName} id={roleName} onClick={onRoleClicked}>
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
