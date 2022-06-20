import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Lobby from "./views/Lobby";
import Join from "./views/Join";
import Game from "./views/game/Game";
import Help from "./views/help/Help";
import { ToastContainer } from "react-toastify";
import DataController from "./controllers/DataController";
import { Button } from "react-bootstrap";
import ScenarioEditor from "./views/admin/ScenarioEditor";

function App() {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    document.title = "Mafia " + process.env.REACT_APP_VER;
  }, []);

  DataController.BindModal(
    () => setModalShow(true),
    () => setModalShow(false),
  );

  return (
    <div className='app-container'>
      <ToastContainer />
      <Modal data-backdrop="true" show={modalShow} onHide={() => setModalShow(false)} scrollable={true}>
        <Modal.Body data-backdrop="true" >
          <Button className='mafia-modal-close' onClick={() => setModalShow(false)}>X</Button>
          {DataController.GetModalText()}
        </Modal.Body>
      </Modal>
      <Router>
        <Switch>
          <Route path='/join'>
            <Join></Join>
          </Route>
          <Route path='/lobby'>
            <Lobby></Lobby>
          </Route>
          <Route path='/game'>
            <Game></Game>
          </Route>
          <Route path='/help'>
            <Help></Help>
          </Route>
          <Route path='/scenario-editor'>
            <ScenarioEditor canStartGame={false} isModal={false}></ScenarioEditor>
          </Route>
          <Route path='/'>
            <Redirect to='/join' />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
