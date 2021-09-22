import AppController from "../../controllers/AppController";
import hamburger from "../../graphics/hamburger.png";

function HamburgerButton(props) {
  const onClicked = () => {
    AppController.ToggleShowMenu();
    console.log("AppController.IsMenuShown is " + AppController.IsMenuShown());
  };

  return (
    <div className='hamburger-button-container' onClick={onClicked}>
      <img className='hamburger-button' src={hamburger}></img>
    </div>
  );
}

export default HamburgerButton;
