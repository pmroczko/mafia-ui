import Header from "../../components/Header"
import {useState} from  'react';
import MafiaGameButton from "../../components/buttons/MafiaGameButton";
import { BsPencilFill } from 'react-icons/bs';
import { GiConfirmed } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';
import ScenarioEditPage from "./ScenarioEditPage";
import DataController from "../../controllers/DataController";


const ScenarioEditor = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [selectedName, setselectedName] = useState(null);
    const toggleVisibility = () => {setIsVisible(!isVisible)};

    const scenarios = DataController.GetAllScenarios();

    const selectScenario = (senarioPos) => {
        console.log("Selected scenario "+senarioPos);
        setselectedName(senarioPos);
    }

    const GetAllScenarios = () => {
        const iconStyle = {fontSize: '26px'}
        const ret = [];
        for(var i in scenarios){
            const s = scenarios[i];
            const pos = i;
            const key = s.name;
            ret.push(<tr key={key}>
                <td>{s.name}</td>
                <td className='mafia-centered'>{s.raw_scenario.length}</td>
                <td className='mafia-centered'>
                    <GiConfirmed style={iconStyle} onClick={()=>selectScenario(key)}/>
                </td>
                <td className='mafia-centered'>
                    <BsPencilFill style={iconStyle} onClick={()=>selectScenario(key)}/>
                </td>
                <td className='mafia-centered'>
                    <MdDelete style={iconStyle} onClick={()=>selectScenario(key)}/>
                </td>
            </tr>)
        }
        return ret;
    }

    const tableView = () => {
        return (<div className="scenarios-container">
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>#Players</th>
                    <th scope='col'>Select</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {GetAllScenarios()}
            </tbody>
        </table>
        </div>)
    }

    const editorView = () => {
        return (
            <ScenarioEditPage name={selectedName}/>
        )
    }

    return <div>
        <Header text='Scenario Editor' onMenuShown={toggleVisibility} onMenuHidden={toggleVisibility} />
        {isVisible && (selectedName == null ? tableView() : editorView())}
    </div>
}

export default ScenarioEditor;