import { useState, useEffect } from 'react';
import { BsPencilFill } from 'react-icons/bs';
import { GiConfirmed } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';
import ScenarioEditPage from "./ScenarioEditPage";
import DataController from "../../controllers/DataController";
import Footer from "../../components/Footer";

const ScenarioEditor = ({ onSelected, setAdminSubPage }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [editedScenarioName, setEditedScenarioName] = useState(null);
    const [selectedScenarioName, setSelectedScenarioName] = useState(null);
    const [scenarios, setScenarios] = useState([]);
    const toggleVisibility = () => { setIsVisible(!isVisible) };

    useEffect(() => {
        setScenarios(DataController.GetAllScenarios());
    }, [editedScenarioName]);

    const selectScenario = (name) => {
        console.log(`Selected ${name} scenario`);
        setSelectedScenarioName(name == selectedScenarioName ? null : name)
        onSelected && onSelected(name);
    }
    const editScenario = (name) => {
        console.log(`Editing ${name} scenario`);
        setEditedScenarioName(name);
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
            ret.push(
                <tr key={name} onClick={() => selectScenario(name)} className={name == selectedScenarioName ? "selected-scenario" : ""} >
                    <td>{s.name}</td>
                    <td className='mafia-centered'>{s.raw_scenario.length}</td>
                </tr >)
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
        {
            text: "Edit",
            callback: () => { editScenario(selectedScenarioName) }
        },
        {
            text: "Delete",
            callback: () => { deleteScenario(selectedScenarioName) }
        },
    ]

    const tableView = () => {
        return (
            <div>
                <div className="scenarios-container">
                    <table className="scenarios-table">
                        <thead>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>#Players</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GetAllScenarios()}
                        </tbody>
                    </table>
                </div>
                <Footer buttons={editorFooterButtons} className='mafia-footer-admin' />
            </div >)
    }

    const createNew = () => {
        setEditedScenarioName('NewScenario');
    }

    const editorView = () => {
        return (
            <ScenarioEditPage name={editedScenarioName} goBack={() => setEditedScenarioName(null)} />
        )
    }

    return <div>
        {isVisible && (editedScenarioName == null ? tableView() : editorView())}
    </div>
}

export default ScenarioEditor;