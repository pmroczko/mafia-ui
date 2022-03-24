import { Button } from "react-bootstrap";

const Footer = ({ isAdmin = false, buttons }) => {
  const buttonArray = buttons.map((button, idx) => (
    (button.admin !== true || isAdmin === true) &&
    < Button
      key={idx}
      onClick={() => button.callback()}
      className='mafia-button'
    >
      {button.text}
    </Button>
  ));

  return <div className='mafia-footer'>{buttonArray}</div>;
};

export default Footer;
