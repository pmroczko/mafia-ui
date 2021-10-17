import MessageController from "../../controllers/MessageController";
import { Button } from "react-bootstrap";
import MafiaButton from "../../components/buttons/MafiaButton";
import MafiaInput from "../../components/Input";
import Header from "../../components/Header";
import { useRef, useEffect } from "react";
import ButtonClasses from "../../enums/ButtonClasses";
import AdminMenuOptions from "../../enums/AdminMenuOptions";
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
