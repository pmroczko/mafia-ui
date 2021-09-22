import hamburger from "../../graphics/hamburger.png";

function HamburgerButton(props) {
  return (
    <div className='hamburger-button-container'>
      <img className='hamburger-button' src={hamburger}></img>
    </div>
  );
}

export default HamburgerButton;
