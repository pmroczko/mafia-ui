import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Admin from "./views/Admin";
import Lobby from "./views/Lobby";
import NewPlayer from "./views/NewPlayer";
import Player from "./views/Player";

function App() {
  return (
    <div className='app-container'>
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
          <Route path='/player'>
            <Player></Player>
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
