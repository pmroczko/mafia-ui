import Header from "../../components/Header";
import MafiaButton from "../../components/buttons/MafiaButton";
import { useRef, useEffect, useState } from "react";
import MafiaInput from "../../components/Input";
import MessageController from "../../controllers/MessageController";
import ButtonClasses from "../../enums/ButtonClasses";
import AdminLogin from "./AdminLogin";

function Admin() {
  const senarioRef = useRef();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function updateRef() {
      if (senarioRef.current) {
        senarioRef.current.value = "test_scenario_1";
      }
    }
    updateRef();
  }, [isAuthenticated]);

  const startGameCallback = (resp) => {
    if (resp.status === 200) {
      window.location = "/game";
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

  const onAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const adminPanel = (
    <div>
      <Header text='Admin Panel' />
      <div className='mafia-container admin-container'>
        <MafiaInput referenceField={senarioRef} />
        <div className='admin-button-container'>
          <MafiaButton
            label='StartGame'
            func='StartGame'
            customClass={ButtonClasses.Big}
            args={[senarioRef, startGameCallback]}
          />
          <MafiaButton
            label='End Day'
            func='EndDay'
            customClass={ButtonClasses.Big}
          />
          <MafiaButton
            label='End Night'
            func='EndNight'
            customClass={ButtonClasses.Big}
          />
          <MafiaButton
            label='End Game'
            func='EndGame'
            customClass={ButtonClasses.Big}
            args={[endGameCallback]}
          />
        </div>
      </div>
    </div>
  );

  return isAuthenticated ? (
    adminPanel
  ) : (
    <AdminLogin onAuthenticated={onAuthenticated} />
  );
}

export default Admin;
