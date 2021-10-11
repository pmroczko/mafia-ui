import { Button } from "react-bootstrap";

const Footer = ({ buttons }) => {
  const buttonArray = [];
  for (let button of buttons) {
    buttonArray.push(
      <Button onClick={() => button.callback()} className='mafia-button'>
        {button.text}
      </Button>,
    );
  }

  return <div className='mafia-footer'>{buttonArray}</div>;
};

export default Footer;
