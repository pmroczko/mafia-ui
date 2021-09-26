import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Admin from "./views/Admin";
import Lobby from "./views/Lobby";
import NewPlayer from "./views/NewPlayer";
import Game from "./views/Game";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className='app-container'>
      <ToastContainer />
      <Router>
        <Switch>
          <Route path='/admin'>
            <Admin></Admin>
          </Route>
          <Route path='/lobby'>
            <Lobby></Lobby>
          </Route>
          <Route path='/newPlayer'>
            <NewPlayer></NewPlayer>
          </Route>
          <Route path='/game'>
            <Game></Game>
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
