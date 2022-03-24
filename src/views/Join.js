import { useRef, useEffect, useState } from "react";
import MafiaButton from "../components/buttons/MafiaButton";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import MafiaInput from "../components/controls/MafiaInput";
import CacheController from "../controllers/CacheController";
import ButtonClasses from "../enums/ButtonClasses";
import { Button } from "react-bootstrap";
import MafiaService from "../services/MafiaService";

function Join() {
  const nameInputRef = useRef();
  const serverIdInputRef = useRef();
  const [isNameValid, setIsNameValid] = useState(false);
  const [isServerIdValid, setIsServerIdValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const validateName = () => {
    if (!nameInputRef.current)
      return "";
    var name = nameInputRef.current.value;

    var valid = name.length > 0 && name.length < 9;
    valid = valid && name.match(/^[a-z0-9]+$/i);
    var msg = valid ? "" : "Your must be alphanumeric and 1-8 characters long";
    setIsNameValid(valid);
    return msg;
  }

  const validateServerId = () => {
    if (!serverIdInputRef.current)
      return "";
    var name = serverIdInputRef.current.value;

    var valid = name.length > 1 && name.length < 15;
    valid = valid && name.match(/^[a-z0-9]+$/i);
    var msg = valid ? "" : "Server must be alphanumeric and 2-15 characters long";
    console.log(msg)
    setIsServerIdValid(valid);
    return msg;
  }

  const validateInput = () => {
    let nameErrMsg = validateName();
    let serverIdErrMsg = validateServerId();
    setValidationMessage(nameErrMsg != "" ? nameErrMsg : serverIdErrMsg)
  }

  useEffect(() => {
    async function updateRef() {
      if (CacheController.IsPlayerNameSet()) {
        nameInputRef.current.value = CacheController.GetPlayerName();
      }
    }
    updateRef();
    validateName();
  }, []);

  function joinGameCallback() {
    CacheController.SetPlayerName(nameInputRef.current.value);
    CacheController.SetServerId(serverIdInputRef.current.value);
    window.location = `/lobby`;
  }

  function createGameCallback() {
    MafiaService.JoinGame(serverIdInputRef, nameInputRef, joinGameCallback)
  }

  return (
    <div className='mafia-container new-player-container'>
      <div>
        <Header text='Join Game' />
        <label htmlFor="NameInput" className="mafia-input-label">Your name</label>
        <MafiaInput id={"NameInput"} referenceField={nameInputRef} isEnabled={false} onChanged={() => validateInput()} />
        <label htmlFor="ServerInput" className="mafia-input-label">Server name</label>
        <MafiaInput id={"ServerInput"} referenceField={serverIdInputRef} isEnabled={false} onChanged={() => validateInput()} />
        <div className='mafia-validation-message'>{validationMessage}</div>
        <MafiaButton
          label='Create Game'
          func='CreateGame'
          args={[serverIdInputRef, nameInputRef, createGameCallback]}
          customClass={ButtonClasses.Big}
          isdisabled={!isNameValid || !isServerIdValid}
        />
        <MafiaButton
          label='Join Game'
          func='JoinGame'
          args={[serverIdInputRef, nameInputRef, joinGameCallback]}
          customClass={ButtonClasses.Big}
          isdisabled={!isNameValid || !isServerIdValid}
        />
      </div>
    </div>
  );
}

export default Join;
