import ROLES from "../../data/roles.json"
import { Fragment, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Switch from "react-switch"

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

    const fieldToText = (fieldName) => {
        return {
            "is_sus": "Is suspicius to Sheriff",
            "is_night_immune": "Is immune to kill at night",
            "can_target_self": "Can target self",
            "action_count": "Ability usage count maximum",
            "action_cooldown": "Delay after using the ability"
        }[fieldName]
    }

    const fieldEditor = () => {
        var rows = []
        rows.push(<div key="rule_empty_row" style={{ "height": "20px" }}></div >)
        if (roles != null) {
            Object.keys(roles).forEach((roleName) => {
                let role = roles[roleName];
                rows.push(<b key={"roleName_" + roleName}>{roleName}</b>)
                Object.keys(role).forEach((field) => {
                    if (isFieldEditable(roleName, field)) {
                        rows.push(
                            <div key={"rule_row_" + roleName + "_" + field} className="role-rule-row" > {fieldToText(field)}
                                {(typeof role[field]) == "boolean" &&
                                    <Switch
                                        className="role-rule-row-toggle"
                                        id='shuffle-switch'
                                        checked={roles[roleName][field]}
                                        onChange={onBoolChange(roleName, field)}
                                        offColor="#a0a0a0"
                                        onColor="#68cc74"
                                        offHandleColor="#272727"
                                        onHandleColor="#f0f0f0"
                                        height={30}
                                        width={70}
                                    />
                                }
                                {
                                    field === "action_count" &&
                                    <input className="role-rule-row-input"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={roles[roleName][field]}
                                        onChange={onIntChange(roleName, field)} />
                                }
                                {
                                    field === "action_cooldown" &&
                                    <span className="role-rule-row-range">
                                        <input
                                            className="role-rule-row-range-input"
                                            type="range"
                                            min="1"
                                            max="3"
                                            value={roles[roleName][field]}
                                            onChange={onIntChange(roleName, field)}
                                            list="ticks" />
                                        <datalist id="ticks" className="role-rule-row-range-ticks">
                                            <option value="0" label="0"></option>
                                            <option value="1" label="1"></option>
                                            <option value="2" label="2"></option>
                                        </datalist>
                                    </span>
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
            console.log(event.target.value)
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