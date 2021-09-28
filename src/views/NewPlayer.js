import { useRef, useEffect } from "react";
import MafiaButton from "../components/buttons/MafiaButton";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import MafiaInput from "../components/Input";
import CacheController from "../controllers/CacheController";
import MessageController from "../controllers/MessageController";
import ButtonClasses from "../enums/ButtonClasses";

function NewPlayer() {
  const nameInputRef = useRef();

  useEffect(() => {
    async function updateRef() {
      if (CacheController.IsPlayerNameSet()) {
        nameInputRef.current.value = CacheController.GetPlayerName();
      }
    }
    updateRef();
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
    <div className='new-player-container'>
      <div>
        <Header text='Enter your name' />
        <MafiaInput referenceField={nameInputRef} />
        <MafiaButton
          label='Join Game'
          func='JoinGame'
          args={[nameInputRef, connectCallback]}
          customClass={ButtonClasses.Big}
        />
      </div>
    </div>
  );
}

export default NewPlayer;
