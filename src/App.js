import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Admin from "./components/Admin";
import Lobby from "./components/Lobby";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/admin'>
          <Admin></Admin>
        </Route>
        <Route path='/lobby'>
          <Lobby></Lobby>
        </Route>
        <Route path='/'>
          <Redirect to='/lobby' />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
