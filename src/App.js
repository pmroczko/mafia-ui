import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect } from "react";
import Admin from "./views/admin/Admin";
import Lobby from "./views/Lobby";
import Join from "./views/Join";
import Game from "./views/game/Game";
import Help from "./views/Help";
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    document.title = "Mafia " + process.env.REACT_APP_VER;
  }, []);

  return (
    <div className='app-container'>
      <ToastContainer />
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
