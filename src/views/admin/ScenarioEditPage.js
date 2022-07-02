import { useEffect, useState } from "react";
import DataController from "../../controllers/DataController";
import { Button } from "react-bootstrap";
import Footer from "../../components/Footer";
import ColorRoleInput from "../../services/ScenarioValidator";
import MessageController from "../../controllers/MessageController";
import ScenarioRulesEditPage from "./ScenarioRulesEditPage";

const ScenarioEditPage = ({ name, goBack }) => {

    const [scenario, setScenario] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [showRulesEditor, setShowRulesEditor] = useState(false);

    useEffect(() => {
        console.log(`Loading scenario ${name}`);
        var s = DataController.GetScenario(name);
        setScenario(s);
    }, [name]);

    const isValid = () => {
        if (scenario === null) {
            MessageController.ShowInfo("Scenario is invalid.");
            return false
        }
        if (scenario.name.length > 30) {
            MessageController.ShowInfo("Name should have at most 30 characters.");
            return false
        }
        return true
    }

    const save = () => {
        console.log(`Saving ${scenario.name} scenario...`);
        DataController.SaveScenario(scenario);
        return true;
    }

    const getRoles = () => {
        var ret = [];
        for (let i in scenario.raw_scenario) {
            const role = scenario.raw_scenario[i];
            const dataId = `raw_scenario[${i}]`;
            ret.push(
                <div key={"role_row_" + i}>
                    {selectedRole === i ?
                        <div className='mafia-scep-row' key={"role_row_input_" + i}>
                            <input type='text'
                                key={"role_row_input_field_" + i}
                                className='mafia-scep-role-input'
                                data-id={dataId}
                                onChange={onChange}
                                defaultValue={role}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        setSelectedRole(null)
                                    }
                                }}></input>
                        </div> :
                        <div onClick={() => setSelectedRole(i)} key={"role_row_text_" + i} >{ColorRoleInput(role)}</div>}
                </div>


            )
        }
        return ret;
    }

    const addRole = () => {
        let newRawScenario = scenario.raw_scenario;
        newRawScenario.push("Citizen")
        setScenario({
            ...scenario,
            raw_scenario: newRawScenario
        })
    }

    const removeRole = () => {
        let newRawScenario = scenario.raw_scenario;
        newRawScenario.pop()
        setScenario({
            ...scenario,
            raw_scenario: newRawScenario
        })
    }

    const onChange = (ref) => {
        const field = ref.currentTarget.getAttribute("data-id");
        console.log(`${field} onchange`);
        if (field.indexOf('[') !== -1) {
            const split = field.split(/[[\]]/);
            const field2 = split[0];
            const index = split[1];
            scenario[field2][index] = ref.currentTarget.value;

        } else {
            scenario[field] = ref.currentTarget.value;
        }
    }

    const onDurationChange = (ref) => {
        const field = ref.currentTarget.getAttribute("data-id");
        scenario[field] = parseInt(ref.currentTarget.value)
    }

    const getInputs = () => {
        return <div className='mafia-scep-input-container'>
            <div className='mafia-scep-row'><div className='mafia-scep-label'>Name</div><input type='text' className='mafia-scep-input' defaultValue={scenario.name} data-id="name" onChange={onChange} ></input></div>
            <div className='mafia-scep-row'><div className='mafia-scep-label'>Day Duration [s]</div><input type='number' className='mafia-scep-input mafia-scep-input-short' data-id="day_duration" onChange={onDurationChange} defaultValue={scenario.day_duration}></input></div>
            <div className='mafia-scep-row'><div className='mafia-scep-label'>Night Duration [s]</div><input type='number' className='mafia-scep-input mafia-scep-input-short' data-id="night_duration" onChange={onDurationChange} defaultValue={scenario.night_duration}></input></div>
            <div className='mafia-scep-row'><Button className='mafia-button' onClick={() => { setShowRulesEditor(true) }}>Rules</Button></div>
            <div className='mafia-scep-separator'>Roles({scenario ? scenario.raw_scenario.length : 0}) :
                <Button onClick={addRole} className='mafia-button'>
                    ++
                </Button>
                <Button onClick={removeRole} className='mafia-button'>
                    --
                </Button>
            </div>
            <div className='mafia-scep-roles'>{getRoles()}</div>

        </div>
    }

    const editorFooterButtons = [
        {
            text: "Back",
            callback: goBack
        },
        {
            text: "Save",
            callback: () => {
                if (isValid()) {
                    save();
                    goBack();
                }
            }
        },
    ]

    return scenario != null && (
        showRulesEditor ?
            <ScenarioRulesEditPage scenario={scenario} save={(newRules) => { setShowRulesEditor(false); setScenario({ ...scenario, rules_diff: newRules }); }} goBack={() => { setShowRulesEditor(false) }} /> :
            <div className='mafia-scep-outer-container'>
                <div className='mafia-scep-container'>
                    {getInputs()}
                </div>
                <Footer buttons={editorFooterButtons} className='mafia-footer-admin'></Footer>
            </div>
    );

}


export default ScenarioEditPage;