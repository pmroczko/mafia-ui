import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Admin from "./views/admin/Admin";
import Lobby from "./views/Lobby";
import NewPlayer from "./views/NewPlayer";
import Game from "./views/Game";
import Help from "./views/Help";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className='app-container'>
      <ToastContainer />
      <Router>
        <Switch>
          <Route path='/newPlayer'>
            <NewPlayer></NewPlayer>
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
