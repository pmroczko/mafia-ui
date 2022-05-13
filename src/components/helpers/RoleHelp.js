import ROLES from "../../data/roles.json";

function RoleHelp({ roleName }) {
    const role = ROLES[roleName];

    const abilityDescription = (role) => {
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
    };

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
            <div> {abilityDescription(role)} </div>
            <hr />
            {role.description.map(line => <div key={line}> {line} </div>)}
            <hr />
            <div> {!role.types.length ? "No types." : role.types.slice(1).join(" ")}</div>
        </div>
    </div>
}

export default RoleHelp;