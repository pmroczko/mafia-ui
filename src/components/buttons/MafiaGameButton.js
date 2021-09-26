import { Button } from "react-bootstrap";
function MafiaGameButton({ text, callback }) {
  return (
    <td>
      <Button onClick={callback} className='mafia-button'>
        {text}
      </Button>
    </td>
  );
}

export default MafiaGameButton;
