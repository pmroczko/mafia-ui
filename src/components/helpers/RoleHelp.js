import ROLES from "../../data/roles.json";

function RoleHelp({ roleName, roleRules }) {
    const role = ROLES[roleName];

    const abilityDescription = (role) => {
        if (role.action_count === 0) {
            return <div> You don't have night action. </div>
        }
        let actionCD = "";
        if (role.action_count < 30 || role.action_cooldown > 1) {
            actionCD = "You can use ability ";
            if (role.action_count < 30) {
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
            actionCD = "You can use ability every night."
        }

        let actionTarget = "";
        if (role.only_self_action && role.can_target_self) {
            actionTarget = "You can only target yourself.";
        } else if (!role.only_self_action && !role.can_target_self) {
            actionTarget = "You can only target other players."
        } else if (!role.only_self_action && role.can_target_self) {
            actionTarget = "You can target yourself and other players."
        }
        return <div>
            <div>{actionCD} </div>
            <div>{actionTarget} </div>
        </div>
    };

    const passiveRulesDescription = (role) => {
        let suspicability = role.is_sus ? "You are suspicious to Sheriff." : "You are not suspicious to Sheriff.";
        let immunity = role.is_night_immune ? "You can't be killed at night." : "";
        return <div>
            {suspicability.length > 0 && <div>{suspicability} </div>}
            {immunity.length > 0 && <div>{immunity} </div>}
        </div>
    }

    if (!role) {
        return <div className='mafia-role-modal'>
            <div className='mafia-role-modal-body'>
                Data not loaded yet...
            </div>
        </div>
    }

    return <div className='mafia-role-modal'>
        <div className='mafia-role-header'>{role.name}</div>
        <div className='mafia-role-subheader'>{`${role.affiliation} member`}</div>
        <hr />
        <div className='mafia-role-modal-body'>
            <div>{abilityDescription(roleRules)}</div>
            <div>{passiveRulesDescription(roleRules)}</div>
            <hr />
            {role.description.map(line => <div key={line}> {line} </div>)}
            <hr />
            <div> {!role.types.length ? "No types." : role.types.slice(1).join(" ")}</div>
        </div>
    </div>
}

export default RoleHelp;