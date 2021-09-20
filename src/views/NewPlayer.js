import { useRef, useState } from "react";
import MafiaButton from "../components/MafiaButton";
import LobbyUserList from "../components/LobbyUserList";

function NewPlayer() {
    const nameInputRef = useRef()
    const [joinState, setJoinState] = useState("NotConnected");
    const [playerName, setPlayerName] = useState("")

    function connectCallback(resp) {
        if (resp.status === 200) {
            setJoinState("Connected")
            setPlayerName(JSON.parse(resp.data).name)
        }
    }

    function disconnectCallback(resp) {
        if (resp.status === 200) {
            setJoinState("NotConnected")
            setPlayerName("")
        }
    }

    return (
        <div>
            {joinState === "NotConnected" &&
                <div>
                    <h1>Enter your name</h1>
                    <input ref={nameInputRef} type="text" />
                    <MafiaButton label="Join Game" func="JoinGame" args={[nameInputRef, connectCallback]} />
                </div>
            }
            {joinState === "Connected" &&
                <div>
                    <MafiaButton label="Disconnect" func="Disconnect" args={[playerName, disconnectCallback]} />
                    <LobbyUserList></LobbyUserList>
                </div>
            }

        </div>
    );
}

export default NewPlayer;