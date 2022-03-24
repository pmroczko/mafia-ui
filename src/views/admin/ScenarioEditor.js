import { useState, useEffect } from 'react';
import { BsPencilFill } from 'react-icons/bs';
import { GiConfirmed } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';
import ScenarioEditPage from "./ScenarioEditPage";
import DataController from "../../controllers/DataController";
import Footer from "../../components/Footer";

const ScenarioEditor = ({ onSelected, setAdminSubPage }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [selectedName, setselectedName] = useState(null);
    const [scenarios, setScenarios] = useState([]);
    const toggleVisibility = () => { setIsVisible(!isVisible) };

    useEffect(() => {
        setScenarios(DataController.GetAllScenarios());
    }, [selectedName]);


    const selectScenario = (name) => {
        console.log(`Selected ${name} scenario`);
        onSelected && onSelected(name);
    }
    const editScenario = (name) => {
        console.log(`Editing ${name} scenario`);
        setselectedName(name);
    }

    const deleteScenario = (name) => {
        console.log(`Deleting ${name} scenario`);
        DataController.DeleteScenario(name);
        setScenarios(DataController.GetAllScenarios());
    }

    const GetAllScenarios = () => {
        const iconStyle = { fontSize: '26px' }
        const ret = [];
        for (var i in scenarios) {
            const s = scenarios[i];
            const pos = i;
            const name = s.name;
            ret.push(<tr key={name}>
                <td>{s.name}</td>
                <td className='mafia-centered'>{s.raw_scenario.length}</td>
                <td className='mafia-centered'>
                    <GiConfirmed style={iconStyle} onClick={() => selectScenario(name)} />
                </td>
                <td className='mafia-centered'>
                    <BsPencilFill style={iconStyle} onClick={() => editScenario(name)} />
                </td>
                <td className='mafia-centered'>
                    <MdDelete style={iconStyle} onClick={() => deleteScenario(name)} />
                </td>
            </tr>)
        }
        return ret;
    }

    const editorFooterButtons = [
        {
            text: "Back",
            callback: () => { setAdminSubPage(null) }
        },
        {
            text: "Create",
            callback: () => { createNew() }
        },
    ]

    const tableView = () => {
        return (
            <div className="scenarios-container">
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
                <Footer buttons={editorFooterButtons} />
            </div>)
    }

    const createNew = () => {
        setselectedName('NewScenario');
    }

    const editorView = () => {
        return (
            <ScenarioEditPage name={selectedName} goBack={() => setselectedName(null)} />
        )
    }

    return <div>
        {isVisible && (selectedName == null ? tableView() : editorView())}
    </div>
}

export default ScenarioEditor;