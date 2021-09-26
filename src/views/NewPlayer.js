import { useRef, useState } from "react";
import MafiaButton from "../components/buttons/MafiaButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import MafiaInput from "../components/Input";
import CacheController from "../controllers/CacheController";

function NewPlayer() {
  const nameInputRef = useRef();

  function connectCallback(resp) {
    if (resp.status === 200) {
      CacheController.SetPlayerName(nameInputRef.current.value);
      window.location = "/lobby";
    } else if (resp.status === 404) {
      toast("Unable to join.");
    }
  }

  return (
    <div className='new-player-container'>
      <ToastContainer />
      <div>
        <Header text='Enter your name' />
        <MafiaInput referencefield={nameInputRef} />
        <MafiaButton
          label='Join Game'
          func='JoinGame'
          args={[nameInputRef, connectCallback]}
          isBig={true}
        />
      </div>
    </div>
  );
}

export default NewPlayer;
