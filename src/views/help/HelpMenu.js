import { Button } from "react-bootstrap";
import ButtonClasses from "../../enums/ButtonClasses";
import HelpMenuOptions from "../../enums/HelpMenuOptions";

const HelpMenu = ({ onMenuSelected }) => {
  const onButtonClicked = (menuOption) => {
    onMenuSelected(menuOption);
  };

  return (
    <div className='admin-button-container'>
      <Button
        className={`${ButtonClasses.Big}`}
        onClick={() => onButtonClicked(HelpMenuOptions.Roles)}
      >
        Roles
      </Button>
      <Button
        className={`${ButtonClasses.Big}`}
        onClick={() => onButtonClicked(HelpMenuOptions.Functions)}
      >
        Game functions
      </Button>
    </div>
  );
};

export default HelpMenu;
