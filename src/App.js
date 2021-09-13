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

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/admin'>
          <Admin></Admin>
        </Route>
        <Route path='/'>
          <Redirect to='/admin' />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
