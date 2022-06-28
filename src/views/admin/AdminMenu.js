import { Button } from "react-bootstrap";
import MafiaButton from "../../components/buttons/MafiaButton";
import ButtonClasses from "../../enums/ButtonClasses";
import AdminMenuOptions from "../../enums/AdminMenuOptions";
import CacheController from "../../controllers/CacheController";

const AdminMenu = ({ onMenuSelected, selectedScenario, canStartGame }) => {
  const serverId = CacheController.GetServerId();

  return (
    <div className='mafia-container admin-container'>
      <div className='admin-button-container'>
        {canStartGame && <Button
          className={ButtonClasses.Big}
          onClick={() => onMenuSelected(AdminMenuOptions.ScenarioEditor)}
          isdisabled={selectedScenario == null ? "true" : "false"}
        >Start Game
        </Button>}

        <MafiaButton
          label='End Day'
          func='EndDay'
          args={[serverId]}
          customClass={ButtonClasses.Big}
        />
        <MafiaButton
          label='End Night'
          func='EndNight'
          args={[serverId]}
          customClass={ButtonClasses.Big}
        />
      </div>
    </div>
  );
};

export default AdminMenu;
