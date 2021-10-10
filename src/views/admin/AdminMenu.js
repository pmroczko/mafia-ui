import MessageController from "../../controllers/MessageController";
import { Button } from "react-bootstrap";
import MafiaButton from "../../components/buttons/MafiaButton";
import MafiaInput from "../../components/Input";
import Header from "../../components/Header";
import { useRef, useEffect } from "react";
import ButtonClasses from "../../enums/ButtonClasses";
import AdminMenuOptions from "../../enums/AdminMenuOptions";

const AdminMenu = ({ onMenuSelected }) => {
  const senarioRef = useRef();

  useEffect(() => {
    async function updateRef() {
      if (senarioRef.current) {
        senarioRef.current.value = "test_scenario_1";
      }
    }
    updateRef();
  }, []);

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

  const onButtonClicked = (menuOption) => {
    onMenuSelected(menuOption);
  };

  return (
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
          <Button
            className={ButtonClasses.Big}
            onClick={() => onButtonClicked(AdminMenuOptions.PlayerList)}
          >
            Manage Players
          </Button>
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
};

export default AdminMenu;
