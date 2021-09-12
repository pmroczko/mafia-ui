import { Button } from "react-bootstrap";
import MafiaService from "../services/MafiaService";

function Admin() {
  return (
    <div>
      <h1>Mafia Admin panel</h1>
      <ul>
        <li>
          <Button onClick={MafiaService.EndDay}>Finish Day</Button>
        </li>
        <li>
          <Button onClick={MafiaService.EndNight}>Finish Night</Button>
        </li>
      </ul>
    </div>
  );
}

export default Admin;
