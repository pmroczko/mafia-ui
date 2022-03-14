import MessageController from "../../controllers/MessageController";
import { Button } from "react-bootstrap";
import MafiaButton from "../../components/buttons/MafiaButton";
import Header from "../../components/Header";
import { useRef, useEffect, useState } from "react";
import ButtonClasses from "../../enums/ButtonClasses";
import AdminMenuOptions from "../../enums/AdminMenuOptions";
import Switch from "react-switch"
import { BsPencilFill } from 'react-icons/bs';
import DataController from "../../controllers/DataController";
import CacheController from "../../controllers/CacheController";
import MafiaService from "../../services/MafiaService";

const AdminMenu = ({ onMenuSelected, selectedScenario }) => {
  const playerName = CacheController.GetPlayerName();
  const serverId = CacheController.GetServerId();
  const [shuffle, setShuffle] = useState(true);
  const [isShown, setIsShown] = useState(true);
  const toggleShuffle = () => setShuffle(value => !value);

  const startGameCallback = () => {
    MafiaService.StartGame(serverId, DataController.GetScenario(selectedScenario), playerName, shuffle, () => {
      MessageController.ShowInfo("Starting the game!");
      window.location = "/game";
    })
  };

  const endGameCallback = (resp) => {
    MessageController.ShowInfo("Game has ended");
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
      {isShown && <div className='mafia-container admin-container'>
        <div className='mafia-labeled-input'>
          <div className='mafia-labeled-input--label'>Select scenario</div>
          <div>
            <input className='mafia-labeled-input--input' type="text" value={selectedScenario != null ? selectedScenario : ""} disabled></input>
            <span className='mafia-labeled-input--button'>
              <BsPencilFill style={{ fontSize: 30 }} onClick={() => onMenuSelected(AdminMenuOptions.ScenarioEditor)} />
            </span>
          </div>
        </div>

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

          <Button
            className={ButtonClasses.Big}
            onClick={startGameCallback}
            isDisabled={selectedScenario == null}
          >Start Game
          </Button>
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
    </div >
  );
};

export default AdminMenu;
