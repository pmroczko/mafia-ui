import ROLES from "./data/roles.json";
import DataController from "../../controllers/DataController";

function abilityDescription(role) {
  if (role.action_count === 0) {
    return <div> This role has no night action. </div>
  }
  let actionCD = "";
  if (role.action_count !== 100 || role.action_cooldown > 1) {
    actionCD = "Can use ability ";
    if (role.action_count !== 100) {
      actionCD += ` ${role.action_count} time${role.action_count === 1 ? "" : "s"}`;
    }
    if (role.action_cooldown > 1) {
      if (role.action_count !== 100) {
        actionCD += ", "
      }
      actionCD += `every ${role.action_cooldown} nights`
    }
    actionCD += ".";
  } else {
    actionCD = "Can use ability every night."
  }

  let actionTarget = "";
  if (role.only_self_action && role.can_target_self) {
    actionTarget = "Can only target self.";
  } else if (!role.only_self_action && !role.can_target_self) {
    actionTarget = "Can only target other players."
  } else if (!role.only_self_action && role.can_target_self) {
    actionTarget = "Can target self and other players."
  }
  return <div>
    <div>{actionCD} </div>
    <div>{actionTarget} </div>
  </div>
}

const HelpRoles = () => {
  const onRoleClicked = (event) => {
    const role = ROLES[event.target.id];
    const roleInfo = (
      <div className='mafia-role-modal'>
        <h1>{role.name}</h1>
        <div className='mafia-role-subheader'>{`${role.affiliation} member`}</div>
        <hr />
        <div className='mafia-role-modal-body'>
          <div> {abilityDescription(role)} </div>
          <hr />
          {role.description.map(line => <div key={line}> {line} </div>)}
          {role.is_sus && <div> - Is suspicous. </div>}
          {role.is_night_immune && <div> - Is night immune. </div>}
        </div>
      </div>
    );
    DataController.ShowModalInfo(roleInfo);
  };

  const roleColor = (role) => {
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
        <li key={roleName} id={roleName} onClick={onRoleClicked} style={{ color: roleColor(ROLES[roleName]) }}>
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
