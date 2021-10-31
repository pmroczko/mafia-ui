import MessageController from "../../controllers/MessageController";
import { Button } from "react-bootstrap";
import MafiaButton from "../../components/buttons/MafiaButton";
import MafiaInput from "../../components/Input";
import Header from "../../components/Header";
import { useRef, useEffect, useState } from "react";
import ButtonClasses from "../../enums/ButtonClasses";
import AdminMenuOptions from "../../enums/AdminMenuOptions";
import Switch from "react-switch"

const AdminMenu = ({ onMenuSelected }) => {
  const senarioRef = useRef();
  const [shuffle, setShuffle] = useState(true);
  const [isShown, setIsShown] = useState(true);
  const toggleShuffle = () => setShuffle(value => !value);

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

  const toggleVisibility = () => {    
    setIsShown(!isShown);
  }

  return (
    <div>
      <Header text='Admin Panel' onMenuShown={toggleVisibility} onMenuHidden={toggleVisibility} />
      {isShown &&<div className='mafia-container admin-container'>
        <MafiaInput referenceField={senarioRef} />
        <div className='admin-button-container'>
           <div className='admin-roles-shuffle'>
             <div className='admin-roles-shuffle-switch'>
              <Switch
                className='admin-roles-shuffle-switch'
                id='shuffle-switch'
                checked={shuffle}
                onChange={toggleShuffle}
                handleDiameter={28}
                offColor="#808080"
                onColor="#00008b"
                offHandleColor="#272727"
                onHandleColor="#f0f0f0"
                height={40}
                width={70}
              /></div>
            <div className='admin-roles-shuffle-label'>
              <label htmlFor='shuffle-switch'>
                Shuffle roles
              </label>
            </div>
          </div>

          <MafiaButton
            label='StartGame'
            func='StartGame'
            customClass={ButtonClasses.Big}
            args={[senarioRef, shuffle, startGameCallback]}
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
      </div>}
    </div>
  );
};

export default AdminMenu;
