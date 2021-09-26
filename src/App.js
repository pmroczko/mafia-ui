import "./App.css";
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
import Menu from "./components/Menu";
import { useEffect, useState } from "react";

function App() {
  const [menuShown, setMenuShown] = useState(false);
  useEffect(() => {
    async function menuChanged() {
      console.log("menuChanged");
    }
    menuChanged();
  }, []);

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
        {menuShown === true && <Menu />}
      </Router>
    </div>
  );
}

export default App;
