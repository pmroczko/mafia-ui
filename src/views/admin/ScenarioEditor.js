import Header from "../../components/Header"
import {useState} from  'react';
import SimpleScenario from '../../mocks/SimpleScenario'
import MafiaGameButton from "../../components/buttons/MafiaGameButton";
import { BsPencilFill } from 'react-icons/bs';
import { GiConfirmed } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';


const ScenarioEditor = () => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {setIsVisible(!isVisible)};

    const scenarios = [ SimpleScenario, SimpleScenario, SimpleScenario ];

    const selectScenario = (scenarioNumber) => {
        console.log("Selected scenario "+scenarioNumber);
    }

    const getScenarios = () => {
        const iconStyle = {fontSize: '26px'}
        const ret = [];
        for(var i in scenarios){
            const s = scenarios[i];
            const pos = i;
            ret.push(<tr key={pos}>
                <td>{s.name}</td>
                <td className='mafia-centered'>{s.raw_scenario.length}</td>
                <td className='mafia-centered'>
                    <GiConfirmed style={iconStyle} onClick={()=>selectScenario(pos)}/>
                </td>
                <td className='mafia-centered'>
                    <BsPencilFill style={iconStyle}/>
                </td>
                <td className='mafia-centered'>
                    <MdDelete style={iconStyle} onClick={()=>selectScenario(pos)}/>
                </td>
            </tr>)
        }
        return ret;
    }

    return <div>
        <Header text='Scenario Editor' onMenuShown={toggleVisibility} onMenuHidden={toggleVisibility} />
        {isVisible && <div className="scenarios-container">
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
                    {getScenarios()}


                </tbody>
            </table>
            </div>}
    </div>
}

export default ScenarioEditor;