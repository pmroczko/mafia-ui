import { useEffect, useState } from "react";
import DataController from "../../controllers/DataController";
import { Button } from "react-bootstrap";
import ButtonClasses from "../../enums/ButtonClasses";

const ScenarioEditPage = ({ name }) => {

    const [scenario, setScenario] = useState(null);
    const [isValid, setIsvalid] = useState(true);
    useEffect(() => {
        console.log(`Loading scenario ${name}`);
        var s = DataController.GetScenario(name);
        setScenario(s);
    }, []);

    const save = () => {
        console.log(`Saving ${scenario.name} scenario...`);
        DataController.SaveScenario(scenario);
    }

    const getRoles = () => {
        var ret = [];
        for(var i in scenario.raw_scenario){
            const role = scenario.raw_scenario[i];
            const dataId = `raw_scenario[${i}]`;
            ret.push(<div className='mafia-scep-row' key={i}><input type='text' className='mafia-scep-role-input' data-id={dataId} onChange={onChange} defaultValue={role} ></input></div>)
        }

        return ret;
    }

    const onChange = (ref) => {
        const field = ref.currentTarget.getAttribute("data-id");
        console.log(`${field} onchange`);
        if(field.indexOf('[') !== -1) {
            const split = field.split(/[\[\]]/);
            const field2 = split[0];
            const index = split[1];
            scenario[field2][index] = ref.currentTarget.value;

        } else {
            scenario[field] = ref.currentTarget.value;
        }
    }
    const getInputs = () => {
        return <div className='mafia-scep-input-container'>
            <div className='mafia-scep-row'><div className='mafia-scep-label'>Name</div><input type='text' className='mafia-scep-input' defaultValue={scenario.name} data-id="name" onChange={onChange} ></input></div>
            <div className='mafia-scep-row'><div className='mafia-scep-label'>Day Duration</div><input type='number' className='mafia-scep-input mafia-scep-input-short' data-id="day_duration" onChange={onChange} defaultValue={scenario.day_duration}></input></div>
            <div className='mafia-scep-row'><div className='mafia-scep-label'>Night Duration</div><input type='number' className='mafia-scep-input mafia-scep-input-short' data-id="night_duration" onChange={onChange} defaultValue={scenario.night_duration}></input></div>
            <div className='mafia-scep-separator'>Roles:</div>
            {getRoles()}
        </div>
    }

    return scenario != null && (
        <div className='mafia-scep-outer-container'>
        <div className='mafia-scep-container'>
            {getInputs()}
        </div>
        <div className='mafia-scep-button-container'>            
            <Button onClick={save} className='mafia-button mafia-button-sticky' >
                Save
            </Button>
        </div>
        </div>
    );

}


export default ScenarioEditPage;