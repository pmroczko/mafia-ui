import { Button } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import MafiaButton from "../components/MafiaButton";

function NewPlayer() {
    const playerName = useRef()
    function join_game_status_callback(status) {
        console.log("callback: ", status)
    }
    return (
        <div>
            <h1>Enter your name</h1>
            <input ref={playerName} type="text" />
            <MafiaButton label="Join Game" func="JoinGame" args={[playerName, join_game_status_callback]} />
        </div>
    );
}

export default NewPlayer;