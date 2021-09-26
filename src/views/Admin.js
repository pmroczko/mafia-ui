import Header from "../components/Header";
import MafiaButton from "../components/buttons/MafiaButton";
import { useRef } from "react";
import MafiaInput from "../components/Input";
import { toast } from "react-toastify";

function Admin() {
  const senarioRef = useRef("test_scenario_1");

  const startGameCallback = (resp) => {
    if (resp.status === 200) {
      window.location = "/game";
    } else if (resp.status === 404) {
      toast("Unable to start the game");
    }
  };
  const endGameCallback = (resp) => {
    if (resp.status === 200) {
      toast("Game has ended");
    } else if (resp.status === 404) {
      toast("Unable to end the game");
    }
  };

  return (
    <div>
      <Header text='Admin Panel' />
      <div className='admin-container'>
        <MafiaInput referenceField={senarioRef} />
        <div className='admin-button-container'>
          <MafiaButton
            label='StartGame'
            func='StartGame'
            isBig={true}
            args={[senarioRef, startGameCallback]}
          />
          <MafiaButton label='End Day' func='EndDay' isBig={true} />
          <MafiaButton label='End Night' func='EndNight' isBig={true} />
          <MafiaButton
            label='End Game'
            func='EndGame'
            isBig={true}
            args={[endGameCallback]}
          />
        </div>
      </div>
    </div>
  );
}

export default Admin;
