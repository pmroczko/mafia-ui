import Header from "../components/Header";
import LobbyUserList from "../components/LobbyUserList";
import { useState } from "react";

function Lobby() {
  const [isListShown, setIsListShown] = useState(true);

  const toggleListShown = () => {
    setIsListShown(!isListShown);
  };
  return (
    <div className='main-container lobby-container '>
      <Header
        text='Mafia Lobby'
        onMenuShown={toggleListShown}
        onMenuHidden={toggleListShown}
      />
      {isListShown && <LobbyUserList />}
    </div>
  );
}

export default Lobby;
