import { useLocation } from "react-router-dom";
import MenuLink from "./buttons/MenuLink";

function Menu({ onClicked }) {
  var location = useLocation();
  location = location.pathname.substring(1);
  onClicked = onClicked ? onClicked : () => {};
  return (
    <div className='menu-container'>
      <h1>Menu</h1>
      <MenuLink
        route='newPlayer'
        text='Join Game'
        location={location}
        onClicked={onClicked}
      />
      <MenuLink
        route='lobby'
        text='Lobby'
        location={location}
        onClicked={onClicked}
      />
      <MenuLink
        route='game'
        text='Game'
        location={location}
        onClicked={onClicked}
      />
      <MenuLink
        route='admin'
        text='Admin'
        location={location}
        onClicked={onClicked}
      />
    </div>
  );
}

export default Menu;
