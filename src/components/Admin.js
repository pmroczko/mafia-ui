import { Button } from "react-bootstrap";
import MafiaService from "../services/MafiaService";

function Admin() {
  return (
    <div>
      <h1>Mafia Admin Panel</h1>
      <Button onClick={MafiaService.EndDay}>Finish Day</Button>
      <Button onClick={MafiaService.EndNight}>Finish Night</Button>
    </div>
  );
}

export default Admin;
