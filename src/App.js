import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Admin from "./views/admin/Admin";
import Lobby from "./views/Lobby";
import Join from "./views/Join";
import Game from "./views/game/Game";
import Help from "./views/help/Help";
import { ToastContainer } from "react-toastify";
import DataController from "./controllers/DataController";

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
      <Modal show={modalShow} onHide={() => setModalShow(false)} scrollable={true}>
        <Modal.Body>{DataController.GetModalText()}</Modal.Body>
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
          <Route path='/admin'>
            <Admin></Admin>
          </Route>
          <Route path='/'>
            <Redirect to='/lobby' />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
