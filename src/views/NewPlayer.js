import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import MafiaButton from "../components/buttons/MafiaButton";
import LobbyUserList from "../components/LobbyUserList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import useInterval from "../hooks/UseInterval";
import MafiaService from "../services/MafiaService";

const ConnectionStatus = {
  Connected: "Connected",
  NotConnected: "NotConnected",
};

function NewPlayer() {
  let history = useHistory();
  const nameInputRef = useRef();
  const [connectionStatus, setconnectionStatus] = useState(
    ConnectionStatus.NotConnected,
  );
  const [playerName, setPlayerName] = useState(null);

  useInterval(async () => {
    if (playerName != null) {
      MafiaService.GetPlayerPosition(playerName, async resp => {
        if (resp.status === 200) {
          history.push(`/player?position=${JSON.parse(resp.data)}`)
        }
      })
    }

  }, 1000);

  function connectCallback(resp) {
    if (resp.status === 200) {
      setconnectionStatus(ConnectionStatus.Connected);
      setPlayerName(JSON.parse(resp.data));
    } else if (resp.status === 404) {
      toast("Unable to join.");
    }
  }

  function disconnectCallback(resp) {
    if (resp.status === 200) {
      setconnectionStatus(ConnectionStatus.NotConnected);
      setPlayerName(null);
    }
  }

  return (
    <div>
      <ToastContainer />
      {connectionStatus === ConnectionStatus.NotConnected && (
        <div>
          <Header text='Enter your name' />
          <input ref={nameInputRef} type='text' />
          <MafiaButton
            label='Join Game'
            func='JoinGame'
            args={[nameInputRef, connectCallback]}
          />
        </div>
      )}
      {connectionStatus === ConnectionStatus.Connected && (
        <div>
          <MafiaButton
            label='Disconnect'
            func='Disconnect'
            args={[playerName, disconnectCallback]}
          />
          <LobbyUserList></LobbyUserList>
        </div>
      )}
    </div>
  );
}

export default NewPlayer;
