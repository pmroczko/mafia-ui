import { useRef, useEffect, useState } from "react";
import MafiaButton from "../components/buttons/MafiaButton";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import MafiaInput from "../components/controls/MafiaInput";
import CacheController from "../controllers/CacheController";
import MessageController from "../controllers/MessageController";
import ButtonClasses from "../enums/ButtonClasses";

function Join() {
  const nameInputRef = useRef();
  const [isValid, setIsValid] = useState(false);

  const validateName = () => {
    if(!nameInputRef.current)
      return false;
    var name = nameInputRef.current.value;

    var valid = name.length > 0 && name.length < 9;
    setIsValid(valid);
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

  function connectCallback(resp) {
    if (resp.status === 200) {
      CacheController.SetPlayerName(nameInputRef.current.value);
      window.location = "/lobby";
    } else {
      MessageController.ShowError("Unable to join. Check your name!", resp);
    }
  }

  return (
    <div className='mafia-container new-player-container'>
      <div>
        <Header text='Enter your name' />
        <MafiaInput referenceField={nameInputRef} isEnabled={false} onChanged = {() => validateName()} />
        <MafiaButton
          label='Join Game'
          func='JoinGame'
          args={[nameInputRef, connectCallback]}
          customClass={ButtonClasses.Big}
          isDisabled = {!isValid}
        />
      </div>
    </div>
  );
}

export default Join;
