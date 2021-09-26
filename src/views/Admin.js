import Header from "../components/Header";
import MafiaButton from "../components/buttons/MafiaButton";
import { useRef, useEffect } from "react";
import MafiaInput from "../components/Input";
import MessageController from "../controllers/MessageController";

function Admin() {
  const senarioRef = useRef();

  useEffect(() => {
    async function updateRef() {
      senarioRef.current.value = "test_scenario_1";
    }
    updateRef();
  }, []);

  const startGameCallback = (resp) => {
    if (resp.status === 200) {
      window.location = "/game";
    } else if (resp.status === 404) {
      MessageController.ShowError("Unable to start the game", resp);
    } else {
      MessageController.ShowError("Unable to start the game", resp);
    }
  };
  const endGameCallback = (resp) => {
    if (resp.status === 200) {
      MessageController.ShowInfo("Game has ended");
    } else if (resp.status === 404) {
      MessageController.ShowError("Unable to end the game");
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
            customClass='mafia-button-bottom'
            args={[endGameCallback]}
          />
        </div>
      </div>
    </div>
  );
}

export default Admin;
