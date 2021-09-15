import { Button } from "react-bootstrap";
import MafiaService from "../services/MafiaService";
import MafiaButton from "./MafiaButton";
import './_admin.scss';
import './_components.scss';

function Admin() {
  return (
    <div>
      <h1>Mafia Admin Panel</h1>
      <div class="mainContainer">
        <MafiaButton label="End Day" func="EndDay"/>
        <MafiaButton label="End Night" func="EndNight" />
      </div>
    </div>
  );
}

export default Admin;
