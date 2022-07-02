import { useState, useEffect } from 'react';
import ScenarioEditPage from "./ScenarioEditPage";
import Footer from "../../components/Footer";
import DataController from "../../controllers/DataController";
import CacheController from "../../controllers/CacheController";
import MafiaService from "../../services/MafiaService";
import Header from "../../components/Header";

const ScenarioEditor = ({ canStartGame, isModal }) => {
    const [editedScenarioName, setEditedScenarioName] = useState(null);
    const [selectedScenarioName, setSelectedScenarioName] = useState(null);
    const [scenarios, setScenarios] = useState([]);
    const [isListShown, setIsListShown] = useState(true);

    const toggleListShown = () => {
        setIsListShown(!isListShown);
    };

    useEffect(() => {
        setScenarios(DataController.GetAllScenarios());
    }, [editedScenarioName]);

    const selectScenario = (name) => {
        console.log(`Selected ${name} scenario`);
        setSelectedScenarioName(name === selectedScenarioName ? null : name)
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
        const ret = [];
        for (let i in scenarios) {
            let s = scenarios[i];
            let name = s.name;
            ret.push(
                <tr key={"scenario_" + i + "_" + name} onClick={() => selectScenario(name)} className={name === selectedScenarioName ? "selected-scenario" : ""} >
                    <td>{s.name}</td>
                    <td className='mafia-centered'>{s.raw_scenario.length}</td>
                </tr >)
        }
        ret.push(<tr key={"scenario_empty"}></tr>)
        return ret;
    }

    let editorFooterButtons = [
        {
            text: "Create",
            callback: () => { createNew() }
        },
        {
            text: "Delete",
            callback: () => { deleteScenario(selectedScenarioName) }
        },
        {
            text: "Edit",
            callback: () => { editScenario(selectedScenarioName) }
        },
    ];

    if (canStartGame === true) {
        const playerName = CacheController.GetPlayerName();
        const serverId = CacheController.GetServerId();
        editorFooterButtons.push({
            text: "Start",
            callback: () => {
                MafiaService.StartGame(serverId, DataController.GetScenario(selectedScenarioName), playerName, true, () => {
                    window.location = "/game";
                    DataController.ShowModalInfo(null)
                })
            }
        })
    }

    const tableView = () => {
        return (
            <div>
                {!isModal && <Header
                    text={"Scenario editor"}
                    onMenuShown={toggleListShown}
                    onMenuHidden={toggleListShown}
                />}
                {canStartGame && <div className="modal-title">Select scenario</div>}
                <div className={isModal ? "scenarios-container-modal" : "scenarios-container"}>
                    <table className="scenarios-table">
                        <thead >
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
        {(editedScenarioName == null ? tableView() : editorView())}
    </div>
}

export default ScenarioEditor;