import ROLES from "../../data/roles.json"
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

function ScenarioRulesEditPage({ scenario, save, goBack }) {

    const [roles, setRoles] = useState(null);

    // applyRulesDiff(r1, computeRulesDiff(r1, r2)) = r2
    const applyRulesDiff = (r_, diff) => {
        var r = JSON.parse(JSON.stringify(r_));
        diff.forEach((rule) => { r[rule[0]][rule[1]] = rule[2] });
        return r;
    }

    const computeRulesDiff = (r1, r2) => {
        var diff = [];
        Object.keys(r1).forEach((roleName) => {
            Object.keys(r1[roleName]).forEach((field) => {
                if (!isFieldEditable(roleName, field)) { return }
                var newVal = r2[roleName][field]
                if (isNaN(newVal)) {
                    newVal = 0;
                }
                if (r1[roleName][field] !== newVal) {
                    diff.push([roleName, field, newVal])
                }
            })
        });
        return diff;
    }

    useEffect(() => {
        let diff = scenario["rules_diff"];
        setRoles(applyRulesDiff(ROLES, diff));
    }, [scenario]);

    const isFieldEditable = (roleName, field) => {
        if (field === "is_night_immune") {
            return true;
        }

        if (field === "is_sus" && ["Godfather", "SerialKiller", "MassMurder", "Mafioso", "Agent", "Framer", "Seducer", "Counselor", "Consort", "Jester", "Executioner",].includes(roleName)) {
            return true;
        }

        if (field === "can_target_self" && !["Citizen", "Veteran", "Survivor", "Godfather", "Mafioso", "Jester", "Executioner"].includes(roleName)) {
            return true;
        }

        if (field === "action_count" && !["Godfather", "Mafioso", "Jester", "Executioner"].includes(roleName)) {
            return true;
        }

        if (field === "action_cooldown" && !["Godfather", "Mafioso", "Jester", "Executioner"].includes(roleName)) {
            return true;
        }

        return false;
    }

    const fieldEditor = () => {
        var rows = []
        if (roles != null) {
            Object.keys(roles).forEach((roleName) => {
                let role = roles[roleName];
                rows.push(<b>{roleName}</b>)
                Object.keys(role).forEach((field) => {
                    if (isFieldEditable(roleName, field)) {
                        rows.push(
                            <div key={"rule_row_" + roleName + "_" + field} className="role-rule-row" > {field}
                                {(typeof role[field]) == "boolean" &&
                                    <input type="checkbox" className="role-rule-row-toggle" id="defaultUnchecked" checked={roles[roleName][field]}
                                        onChange={onBoolChange(roleName, field)} />}
                                {
                                    (typeof role[field]) != "boolean" &&
                                    <input className="role-rule-row-input" id="defaultUnchecked" type="number" min="0" max="100" value={roles[roleName][field]}
                                        onChange={onIntChange(roleName, field)} />
                                }
                            </div >
                        )
                    }
                })
            })
        }
        return rows;
    }

    const onBoolChange = (roleName, field) => {
        return () => {
            let newVal = !roles[roleName][field];
            setRoles({ ...roles, [roleName]: { ...roles[roleName], [field]: newVal } });
        }
    }

    const onIntChange = (roleName, field) => {
        return (event) => {
            var newVal = parseInt(event.target.value);
            setRoles({ ...roles, [roleName]: { ...roles[roleName], [field]: newVal } });
        }
    }

    const editorFooterButtons = [
        {
            text: "Back",
            callback: () => { goBack() }
        },
        {
            text: "Save",
            callback: () => {
                let rules_diff = computeRulesDiff(ROLES, roles);
                console.log(rules_diff);
                save(rules_diff)
            }
        },
    ]

    return <div>
        <div>{roles && fieldEditor()}</div>
        <Footer buttons={editorFooterButtons} className='mafia-footer-admin'></Footer>
    </div>
}

export default ScenarioRulesEditPage;