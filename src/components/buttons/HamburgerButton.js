import hamburger from "../../graphics/hamburger.png";

function HamburgerButton({ onClicked }) {
  return (
    <div className='hamburger-button-container' onClick={onClicked}>
      <img
        alt='hamburger-menu'
        className='hamburger-button'
        src={hamburger}
      ></img>
    </div>
  );
}

export default HamburgerButton;
