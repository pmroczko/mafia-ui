import { Button } from "react-bootstrap";
import MafiaService from "../services/MafiaService";

function MafiaButton(props) {
    function onClick() {
        console.log('calling' + props.func);
        MafiaService[ props.func ](...(props.args || []));
    }

    return (<Button onClick={onClick} className="mafiaButton"> { props.label }</Button>)
}
export default MafiaButton